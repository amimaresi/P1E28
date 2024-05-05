const mongoose = require('mongoose')

const Encadrement = require("../../schema/Encadrement");

const rechercherEncadrement = async (req, res) => {
    const options = {}; 
    if (req.query.Type) {
        const regexPatternType = new RegExp(req.query.Type, 'i');
        options.Type = regexPatternType; 
    }
    if (req.query.Titre) {
        const regexPatternTitre = new RegExp(req.query.Titre, 'i');
        options.Titre = regexPatternTitre; 
    }
    if (req.query.AnneeD) {
        options.AnneeD = req.query.AnneeD;
    }
    if (req.query.AnneeF) {
        options.AnneeF = req.query.AnneeF;
    }
   if (req.query.Encadrants) {
            options['Encadrants.nomComplet'] = new RegExp('^' + req.query.Encadrants, 'i');
        }
 if (req.query.Etudiants) {
            options['Etudiants'] = new RegExp('^' + req.query.Etudiants, 'i');
        }
if (req.query.idEncadrant) {
    console.log("id chercheur : " + req.query.idEncadrant);
            options['Encadrants._id'] = req.query.idEncadrant;
        }
    

    Encadrement.find(options)
        .then((result) => {
            res.status(200).json({ err: false, Encadrements: result });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ message: err.message });
        });
       
    
};



const queryEncadrement = async (req, res) => {
    const {
        Type,
        Titre,
        NomEncadrant,
        EmailEncadrant,
        roleEncadrant,
        Etudiant,
        AnneeDMin,
        AnneeDMax,
        AnneeFMin,
        AnneeFMax
    } = req.body;

    let query = {};

    if (Type) {
        console.log(Type);
        query.Type = { $regex: new RegExp('^' + Type, 'i') };
    }
    if (Titre) {
        console.log(Titre);
        query.Titre = { $regex: new RegExp('^' + Titre, 'i') };
    }
    if (NomEncadrant) {
        console.log(NomEncadrant);
        query['Encadrants.nomComplet'] = { $regex: new RegExp('^' + NomEncadrant, 'i') };
    }
    if (EmailEncadrant) {
        console.log(EmailEncadrant);
        query['Encadrants._id'] = EmailEncadrant;
    }
    if (roleEncadrant) {
        console.log(roleEncadrant);
        query['Encadrants.role'] = roleEncadrant;
    }
    if (Etudiant) {
        console.log(Etudiant);
        query.Etudiants = { $in: [Etudiant] };
    }
    /*if (AnneeD) {
        console.log(AnneeD);
        query.AnneeD = AnneeD;
    }
    if (AnneeF) {
        console.log(AnneeF);
        query.AnneeF = AnneeF;
    }*/
    if (AnneeDMin || AnneeDMax) {
        query.AnneeD = {};
        if (AnneeDMin) {
            query.AnneeD.$gte = AnneeDMin;
        }
        if (AnneeDMax) {
            query.AnneeD.$lte = AnneeDMax;
        }
    }
    if (AnneeFMin || AnneeFMax) {
        query.AnneeF = {};
        if (AnneeFMin) {
            query.AnneeF.$gte = AnneeFMin;
        }
        if (AnneeFMax) {
            query.AnneeF.$lte = AnneeFMax;
        }
    }

    try {
        const encadrements = await Encadrement.find(query).exec();
        console.log(encadrements);
        if (encadrements.length === 0 && (AnneeDMin || AnneeDMax)) {
            const nearestYear = await Encadrement.findOne({
                AnneeD: { $exists: true, $gte: AnneeDMin ? AnneeDMin : 0, $lte: AnneeDMax ? AnneeDMax : 9999 }
            }).sort(AnneeDMin ? 'AnneeD' : '-AnneeD').exec();
            if (nearestYear) {
                encadrements = [nearestYear];
            }
        }

        // Si aucun encadrement trouvé pour l'intervalle de date de fin, on cherche la date la plus proche
        if (encadrements.length === 0 && (AnneeFMin || AnneeFMax)) {
            const nearestYear = await Encadrement.findOne({
                AnneeF: { $exists: true, $gte: AnneeFMin ? AnneeFMin : 0, $lte: AnneeFMax ? AnneeFMax : 9999 }
            }).sort(AnneeFMin ? 'AnneeF' : '-AnneeF').exec();
            if (nearestYear) {
                encadrements = [nearestYear];
            }
        }
        if (encadrements.length === 0) {
            return res.status(404).json({ message: "Aucun encadrement trouvé" });
        } else {
            res.status(200).json({ Encadrements: encadrements });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const queryEncadrementById = async (req, res) => {
    const _id = req.params.id;
    try {
        const encadrement = await Encadrement.findById(_id).exec();
        console.log(encadrement);
        if (encadrement) {
            res.status(200).json({ Encadrement: encadrement });
        } else {
            res.status(404).json({ message: "Aucun encadrement trouvé avec cet ID." });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Erreur lors de la recherche de l'encadrement par ID." });
    }
}

module.exports = { rechercherEncadrement,queryEncadrement, queryEncadrementById };



const Encadrement = require("../../schema/Encadrement");

/*const rechercherEncadrement = async (req, res) => {
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
            options['Encadrants._id'] = req.query.idEncadrant;
        }
    

    /*Encadrement.find(options)
        .then((result) => {
            res.status(200).json({ err: false, Encadrements: result });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ message: err.message });
        });
        try {
            const result = await Encadrement.find(options).exec();
            res.status(200).json({ err: false, Encadrements: result });
        } catch (err) {
            console.error(err);
            res.status(400).json({ err: true });
        }
    
};

const rechercherEncParId = async (req, res) => {
    try {
        const id = req.params.id;
        const encadrements = await Encadrement.findById(id);
        if (encadrements) {
            res.status(200).json({ error: false, Encadrements : encadrements });
        } else {
            res.status(404).json({ error: true, message: "Aucun encadrement trouvée avec cet ID." });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: true, message: "Erreur lors de la recherche de encadrement par ID." });
    }
};

module.exports = {rechercherEncadrement, rechercherEncParId};*/


const queryEncadrement = async (req, res) => {
    const {
        Type,
        Titre,
        nomCompletEncadrant,
        idEncadrant,
        role,
        Etudiants,
        AnneeD,
        AnneeF
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
    if (nomCompletEncadrant) {
        console.log(nomCompletEncadrant);
        query['Encadrants.nomComplet'] = { $regex: new RegExp('^' + nomCompletEncadrant, 'i') };
    }
    if (idEncadrant) {
        console.log(idEncadrant);
        query['Encadrants._id'] = idEncadrant;
    }
    if (role) {
        console.log(role);
        query['Encadrants.role'] = role;
    }
    if (Etudiants) {
        console.log(Etudiants);
        query.Etudiants = { $in: [Etudiants] };
    }
    if (AnneeD) {
        console.log(AnneeD);
        query.AnneeD = AnneeD;
    }
    if (AnneeF) {
        console.log(AnneeF);
        query.AnneeF = AnneeF;
    }

    try {
        const encadrements = await Encadrement.find(query).exec();
        console.log(encadrements);
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

module.exports = { queryEncadrement, queryEncadrementById };



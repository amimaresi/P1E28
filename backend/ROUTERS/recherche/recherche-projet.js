const mongoose = require('mongoose')

const Projet = require("../../schema/Projet");
const projet_recherche = (req, res) => {
    const option = {};
    if (req.query.Num) {
        option._id = req.query.Num;
    }
    if (req.query.Titre) {
        const regexPatternTitre = new RegExp('^' + req.query.Titre, 'i');
        option.Titre = regexPatternTitre;

    }
    if (req.query.Theme) {
        const regexPatternTheme = new RegExp('^' + req.query.Theme, 'im');
        option.Theme = regexPatternTheme;

    }
    if (req.query.ChefDeProjet) {
        console.log("chefProje" + req.query.ChefDeProjet)
        option.ChefDeProjet = req.query.ChefDeProjet;
    }

    Projet.find(option).then((result) => {
        res.status(200).json({ err: false, Projets: result })

    }).catch((err) => {
        console.log(err);
        res.status(400).json({ err: true })
    })





}
const queryProjet = async (req, res) => {
    const {
        _id,
        Titre,
        ChefDeProjet,
        liste_members,
        DateDebutMin,
        DateDebutMax,
        DateFinMin,
        DateFinMax,
        Theme
    } = req.body;

    let query = {};

    if (_id) {
        console.log(_id);
        query._id = _id;
    }
    if (Titre) {
        console.log(Titre);
        query.Titre = { $regex: new RegExp('^' + Titre, 'i') };
    }
    if (ChefDeProjet) {
        console.log(ChefDeProjet);
        query.ChefDeProjet = { $regex: new RegExp('^' + ChefDeProjet, 'i') };
    }
    if (liste_members) {
        console.log(liste_members);
        query.liste_members = { $in: liste_members };
    }
    /*if (DateDebut) {
        console.log(DateDebut);
        query.DateDebut = DateDebut;
    }
    if (DateFin) {
        console.log(DateFin);
        query.DateFin = DateFin;
    }*/
    if (DateDebutMin || DateDebutMax) {
        query.DateDebut = {};
        if (DateDebutMin) {
            query.DateDebut.$gte = DateDebutMin;
        }
        if (AnneeDMax) {
            query.AnneeD.$lte = AnneeDMax;
        }
    }
    if (DateFinMin || DateFinMax) {
        query.DateFin = {};
        if (DateFinMin) {
            query.DateFin.$gte = DateFinMin;
        }
        if (DateFinMax) {
            query.DateFin.$lte = DateFinMax;
        }
    }
    if (Theme) {
        console.log(Theme);
        query.Theme = { $regex: new RegExp('^' + Theme, 'i') };
    }

    try {
        const projets = await Projet.find(query).exec();
        console.log(projets);
        if (projets.length === 0 && (DateDebutMin || DateDebutMax)) {
            const nearestYear = await Projet.findOne({
                DateDebut: { $exists: true, $gte: DateDebutMin ? DateDebutMin : 0, $lte:DateDebutMax ? DateDebutMax : 9999 }
            }).sort(DateDebutMin ? 'DateDebut' : '-DateDebut').exec();
            if (nearestYear) {
                projets = [nearestYear];
            }
        }

        // Si aucun encadrement trouvé pour l'intervalle de date de fin, on cherche la date la plus proche
        if (projets.length === 0 && (DateFinMin || DateFinMax)) {
            const nearestYear = await Projet.findOne({
                DateFin: { $exists: true, $gte: DateFinMin ? DateFinMin : 0, $lte: DateFinMax ? DateFinMax : 9999 }
            }).sort(DateFinMin ? 'DateFin' : '-DateFin').exec();
            if (nearestYear) {
                projets = [nearestYear];
            }
        }
        if (projets.length === 0) {
            return res.status(404).json({ message: "Aucun projet trouvé" , Projets :[]});
        } else {
            res.status(200).json({ Projets: projets });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
const projet_by_id = async(req, res) => {
    try {
        const id = req.params.id;
        console.log("id : " + id)
        const projet = await Projet.findById(id);
        if (projet) {
            return res.status(200).json({ error: false, projet })
        }
        return res.status(404).json({ error: false, projet: {} })





    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true })
    }
}
module.exports = { projet_recherche,queryProjet, projet_by_id };

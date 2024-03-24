const Encadrement = require("./Schema/Encadrement");

const encadrement_recherche = (req, res) => {
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
    if (req.query.Encadrant) {
        options.Encadrants = { $in: [req.query.Encadrant] };
    }
    if (req.query.EtudiantNom) {
        options['Etudiants.Nom'] = req.query.EtudiantNom;
    }
    if (req.query.EtudiantPrenom) {
        options['Etudiants.Prenom'] = req.query.EtudiantPrenom;
    }

    Encadrement.find(options)
        .then((result) => {
            res.status(200).json({ err: false, Encadrements: result });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ err: true });
        });
};

module.exports = encadrement_recherche;

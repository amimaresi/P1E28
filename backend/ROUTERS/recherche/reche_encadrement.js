const Encadrement = require("../../schema/Encadrement");

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
   if (req.query.Encadrants) {
            options['Encadrants.nomComplet'] = new RegExp('^' + req.query.Encadrants, 'i');
        }
 if (req.query.Etudiants) {
            options['Etudiants'] = new RegExp('^' + req.query.Etudiants, 'i');
        }
if (req.query.idEncadrant) {
            options['Encadrants._id'] = req.query.idEncadrant;
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

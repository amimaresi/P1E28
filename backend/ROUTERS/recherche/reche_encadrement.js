const Encadrement = require("../../schema/Encadrement");

const rechercherEncadrement = (req, res) => {
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

module.exports = {rechercherEncadrement, rechercherEncParId};


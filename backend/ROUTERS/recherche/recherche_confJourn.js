const ConfJourn = require("../../schema/ConfJourn");

const rechercheConference = (req, res) => {
    const options = {};

    if (req.query.Acronyme) {
        options._id = req.query.Acronyme;
    }
    if (req.query.type) {
        options.type = req.query.type;
    }
    if (req.query.nom) {
        const regexPatternNom = new RegExp(req.query.nom, 'i');
        options.nom = regexPatternNom;
    }
    if (req.query.periodicite) {
        options.periodicite = req.query.periodicite;
    }

    ConfJourn.find(options)
        .then((resultats) => {
            res.status(200).json({ err: false, conferences: resultats });
        })
        .catch((erreur) => {
            console.error(erreur);
            res.status(400).json({ err: true });
        });
};

module.exports = rechercheConference;
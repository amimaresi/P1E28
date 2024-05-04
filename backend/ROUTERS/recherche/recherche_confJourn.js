const ConfJourn = require("../../schema/ConfJournal");

/*const rechercheConference = (req, res) => {
    const options = {};

    if (req.query.type) {
        options.type = new RegExp(req.query.type, 'i');
    }
    if (req.query.nom) {
        options.nom = new RegExp(req.query.nom, 'i');
    }
    if (req.query.periodicite) {
        options.periodicite = new RegExp(req.query.periodicite, 'i');
    }

    ConfJourn.find(options)
        .then((resultats) => {
            res.status(200).json({ error: false, ConfJourn: resultats });
        })
        .catch((erreur) => {
            console.error(erreur);
            res.status(400).json({ error: true });
        });
};

const rechercherConfParId = async (req, res) => {
    try {
        const id = req.params.id;
        const conf = await ConfJourn.findById(id);
        if (conf) {
            res.status(200).json({ error: false, ConfJourn: conf });
        } else {
            res.status(404).json({ error: true, message: "Aucune conférence trouvée avec cet ID." });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: true, message: "Erreur lors de la recherche de conférence par ID." });
    }
};

module.exports = { rechercheConference, rechercherConfParId };*/
const rechercheConference = async (req, res) => {
    console.log(req.query);
    const { type, nom, periodicite } = req.query;
    const options = {};

    if (type) {
        options.type = new RegExp('^' + type, 'i');
    }
    if (nom) {
        options.nom = new RegExp('^' + nom, 'i');
    }
    if (periodicite) {
        options.periodicite = new RegExp('^' + periodicite, 'i');
    }

    try {
        const conferences = await ConfJourn.find(options).exec();
        if (conferences.length === 0) {
            return res.status(404).json({ message: "Aucune conférence trouvée" });
        } else {
            res.status(200).json({ ConfJourns: conferences });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: true, message: "Erreur lors de la recherche de conférences" });
    }
};

const rechercherConfParId = async (req, res) => {
    try {
        const id = req.params.id;
        const conf = await ConfJourn.findById(id).exec();
        if (conf) {
            res.status(200).json({ error: false, ConfJourn: conf });
        } else {
            res.status(404).json({ error: true, message: "Aucune conférence trouvée avec cet ID." });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: true, message: "Erreur lors de la recherche de conférence par ID." });
    }
};

module.exports = { rechercheConference, rechercherConfParId };

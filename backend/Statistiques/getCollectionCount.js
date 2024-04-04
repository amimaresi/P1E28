const Chercheur = require('../../schema/Chercheur');
const Projet = require('../../schema/Projet');
const Encadrement = require('../../schema/Encadrement');

const getCollectionCount = async (req, res) => {
    try {
        // Obtenir le nombre de documents dans chaque collection
        const countChercheur = await Chercheur.countDocuments();
        const countProjet = await Projet.countDocuments();
        const countEncadrement = await Encadrement.countDocuments();

        // Retourner les résultats sous forme d'un objet JSON
        res.status(200).json({ countChercheur, countProjet, countEncadrement });
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération du nombre de documents.');
    }
};

module.exports = getCollectionCount;

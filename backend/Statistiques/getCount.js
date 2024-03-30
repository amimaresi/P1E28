const { MongoClient } = require('mongodb');

const getCollectionCount = async (req, res) => {
    try {
        const { databaseName, collectionName } = req.query;

        if (!databaseName || !collectionName) {
            res.status(400).send('Les paramètres databaseName et collectionName sont requis.');
            return;
        }

        // Connexion à la base de données
        const client = await MongoClient.connect('lien de bdd');
        console.log("Connexion à MongoDB réussie");

        // Sélectionner la base de données
        const db = client.db(databaseName);

        // Obtenir le nombre de documents dans la collection spécifiée
        const count = await db.collection(collectionName).countDocuments();

        //console.log(`Nombre de documents dans la collection ${collectionName}: ${count}`);

        // Fermer la connexion
        client.close();

        res.status(200).json({ count });
    } catch (error) {
       // console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération du nombre de documents.');
    }
};

module.exports = getCollectionCount;

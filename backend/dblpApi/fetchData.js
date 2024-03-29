const MongoClient = require('mongodb').MongoClient;
const fetchData = async (req, res) => {
    const cherch = req.query.cherch;  //nom complet du chercheur
    if (!cherch) {
        res.status(400).send('Le paramètre cherch est requis');
        return;
    }

    const lien = "https://dblp.org/search/publ/api?q=" + cherch + "&format=json";
    try {
        const response = await fetch(lien);
        const data = await response.json();

        const tabPublie = data.result.hits.hit;
        const client = await MongoClient.connect('lien de bdd');
        const db = client.db('test'); //nom de bdd
        const collection2 = db.collection('chercheurs'); //nom de collection des chercheures
        const collection1 = db.collection('publications'); //nom de collection des publications
        const chercheur = await collection2.findOne({ nom_complet: cherch }); //recuperer les infos du chercheur
        let donneesAInserer = [];
        let pubCherch = [];
        let z = 0;
        for (let i = 0; i < tabPublie.length; i++) {
            const tabA = [];
            const auteures = tabPublie[i].info.authors.author;
            let rang = -1; //vérifier si c le nom du chercheur
            for (let j = 0; j < auteures.length; j++) {
                tabA[j] = auteures[j].text;
                if (tabA[j] === cherch) {
                    rang = j + 1;
                }
            }

            if (typeof tabPublie[i].info.volume !== "undefined" && typeof tabPublie[i].info.pages !== "undefined" && rang !== -1) {
                const publie = {
                    _id: {
                        Date: tabPublie[i].info.year,
                        idCherch: chercheur._id,
                        volume: tabPublie[i].info.volume,
                        confJourn: tabPublie[i].info.venue,
                        pages: tabPublie[i].info.pages,
                        rang: rang
                    },
                    Titre: tabPublie[i].info.title,
                    Lien: tabPublie[i].info.ee,
                    Membres: tabA,
                };
                donneesAInserer.push(publie); //inserer les publications
                pubCherch[z] = publie._id;
                z++;
            }
        }

        if (pubCherch.length !== 0) {
            await collection2.updateOne( //inserer dans le champ d'un chercheur
                { _id: chercheur._id },
                { $set: { publications: pubCherch } }
            );
            const result = await collection1.insertMany(donneesAInserer); //inserer dans la collection Publications
        }
        console.log('Données insérées avec succès');
        res.status(200).send('Données insérées avec succès');
        client.close();   
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de l\'insertion des données');
   
    }
};

module.exports = fetchData;

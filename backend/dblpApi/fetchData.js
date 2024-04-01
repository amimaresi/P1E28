const mongoose = require('mongoose');
const Chercheur = require('../../schema/Chercheur');
const Publication = require('../../schema/Publication');

const fetchData = async (req, res) => {
    const cherch = req.query.cherch;
    if (!cherch) {
        res.status(400).send('Le paramètre cherch est requis');
        return;
    }

    const lien = "https://dblp.org/search/publ/api?q=" + cherch + "&format=json";
    try {
        const response = await fetch(lien);
        const data = await response.json();

        const tabPublie = data.result.hits.hit;

        

        // Récupérer le chercheur
        const chercheur = await Chercheur.findOne({ nom_complet: cherch });

        let donneesAInserer = [];
        let pubCherch = [];
        let z = 0;

        for (let i = 0; i < tabPublie.length; i++) {
            const tabA = [];
            const auteures = tabPublie[i].info.authors.author;
            let rang = -1;

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
                donneesAInserer.push(publie);
                pubCherch[z] = publie._id;
                z++;
            }
        }

        if (pubCherch.length !== 0) {
            await Chercheur.updateOne(
                { _id: chercheur._id },
                { $set: { publications: pubCherch } }
            );
            const result = await Publication.insertMany(donneesAInserer);
        }

        console.log('Données insérées avec succès');
        res.status(200).send('Données insérées avec succès');

       
        console.log('Connexion à MongoDB fermée');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de l\'insertion des données');
    }
};

module.exports = fetchData;

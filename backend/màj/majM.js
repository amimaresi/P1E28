const { MongoClient } = require('mongodb');


const majManuelle = async () => { 
    try {
        // Connexion à la base de données
        const client = await MongoClient.connect('lien de bdd');
       // console.log("Connexion à MongoDB établie avec succès");

        // Sélectionner la base de données
        const db = client.db('test');

        // Collection dans laquelle extraire les données
        const collection = db.collection('chercheurs');
        const collection1 = db.collection('publications');

        // Récupérer tous les chercheures
        const docs = await collection.find({}).toArray();

        // Parcourir les chercheures pour extraire les données
        for (let doc of docs) {
            const cherch = doc.nom_complet;
            const lien = "https://dblp.org/search/publ/api?q=" + cherch + "&format=json";
            const response = await fetch(lien);
            const data = await response.json();
            const tabPublie = data.result.hits.hit;  //toutes le publications recupérées de DBLP
            let donneesAInserer = [];

            for (let i = 0; i < tabPublie.length; i++) {
                let tabA = [];
                const auteurs = tabPublie[i].info.authors.author;
                let rang = -1; //Si c pas le meme nom de chercheur
                for (let j = 0; j < auteurs.length; j++) {
                    tabA[j] = auteurs[j].text;
                    if (tabA[j] === cherch) {
                        rang = j + 1;
                    }
                }

                if (typeof tabPublie[i].info.volume !== "undefined" && typeof tabPublie[i].info.pages !== "undefined" && rang !== -1) {
                    const publie = {
                        _id: {
                            Date: tabPublie[i].info.year,
                            idCherch: doc._id,
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
                }
            }

            const t = donneesAInserer.length; // le nombre de publication dans DBLP apres tries
            const v = doc.publications ? doc.publications.length : 0;  //nombre de publication chez le chercheur
            const s = t - v;  //la différence

            if (s > 0 && v!== 0) { 
                let ins = [];
                for (let z = 0; z < s; z++) {
                    ins[z] = donneesAInserer[z];
                    await collection.updateOne( //ajouter le idPub dans le champ du chercheur
                        { _id: doc._id },
                        { $push: { publications: donneesAInserer[z]._id } }
                    );
                }
                const result = await collection1.insertMany(ins); //ajouter dans la collection Publications
                //console.log('Données insérées avec succès');
            }
        }

        //console.log('Données traitées');

        // Fermer la connexion
        client.close();
        //console.log('Traitement terminé avec succès');
    } catch (error) {
        //console.error('Une erreur s\'est produite :', error);
    }
};

module.exports = majManuelle;

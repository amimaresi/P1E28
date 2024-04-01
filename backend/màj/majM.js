const mongoose = require('mongoose');
const Chercheur = require('../../schema/Chercheur');  
const Publication = require('../../schema/Publication'); 


const majManuelle = async () => { 
    try {
        

        // Récupérer tous les documents
        const docs = await Chercheur.find({}).exec();

        // Parcourir les documents pour extraire les données
        for (let doc of docs) {
            const cherch = doc.nom_complet;
            const lien = "https://dblp.org/search/publ/api?q=" + cherch + "&format=json";
            const response = await fetch(lien);
            const data = await response.json();
            const tabPublie = data.result.hits.hit;
            let donneesAInserer = [];

            for (let i = 0; i < tabPublie.length; i++) {
                let tabA = [];
                const auteurs = tabPublie[i].info.authors.author;
                let rang = -1;
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

            const t = donneesAInserer.length;
            const v = doc.publications ? doc.publications.length : 0;
            const s = t - v;

            if (s > 0 && v !== 0) {
                let ins = [];
                for (let z = 0; z < s; z++) {
                    ins[z] = donneesAInserer[z];
                    await Chercheur.updateOne(
                        { _id: doc._id },
                        { $push: { publications: donneesAInserer[z]._id } }
                    );
                }
                const result = await Publication.insertMany(ins);
                console.log('Données insérées avec succès');
            }
        }

        console.log('Données traitées');

       
        console.log('Traitement terminé avec succès');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
};

module.exports = majManuelle;

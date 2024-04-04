const Chercheur = require('../../schema/Chercheur');  
const Publication = require('../../schema/Publication'); 
const conf = require('../../schema/ConfJournal');

const majManuelle = async () => { 
    try {
        

        // Récupérer tous les documents
        const docs = await Chercheur.find({}).exec();

        // Parcourir les documents pour extraire les données
        for (let doc of docs) {
            const cherch = doc.nomComplet;
            
            const lien = "https://dblp.org/search/publ/api?q=" + cherch + "&format=json";
            const response = await fetch(lien);
            const data = await response.json();
            const tabPublie = data.result.hits.hit;
            let donneesAInserer = [];


            for (let i = 0; i < tabPublie.length ; i++) { 
               
                let tabA = [];
                const auteurs = tabPublie[i].info.authors.author;
                let rang = -1;
                for (let j = 0; j < auteurs.length; j++) { //la liste des membres
                    tabA[j] = auteurs[j].text;
                   
                    if (tabA[j] === cherch) {
                        rang = j + 1;
                    }
                }

if (typeof tabPublie[i].info.volume === "undefined") { //si le volume est indefini
   
    tabPublie[i].info.volume = "indefini";

}; 
if (typeof tabPublie[i].info.pages === "undefined") { //si le nombre de page est indefini
    tabPublie[i].info.pages = "indefini";
};
                if (rang !== -1) {
                    const publie = {
                        
                            Date: tabPublie[i].info.year,
                            idCherch: doc._id,
                            volume: tabPublie[i].info.volume ,
                            confJourn: tabPublie[i].info.venue,
                            pages: tabPublie[i].info.pages ,
                            rang: rang,
                        
                        Titre: tabPublie[i].info.title,
                        Lien: tabPublie[i].info.ee,
                        Membres: tabA,
                    };
                    donneesAInserer.push(publie);
                    const confjourn = await conf.findOneAndUpdate(
                        { _id: tabPublie[i].info.venue }, 
                        { _id: tabPublie[i].info.venue , type: tabPublie[i].info.type }, 
                        { upsert: true, new: true } 
                    );
                }
            }

            const t = donneesAInserer.length; //nombre de publication dans DBLP
            const v = await Publication.countDocuments({ 'idCherch':  doc._id}); //nombre de publication d'un chercheur dans la bdd
            const s = t - v; 

            if (s > 0 ) {
                let ins = [];
                for (let z = 0; z < s; z++) {
                    ins[z] = donneesAInserer[z];
                   
                }
                const result = await Publication.insertMany(ins);
                console.log('Données insérées avec succès');
            }
        }

        

       
        console.log('Traitement terminé avec succès');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
};

module.exports = majManuelle;

const Chercheur = require('../schema/Chercheur');
const Encadrement = require('../schema/Encadrement');
const Projet = require('../schema/Projet ');
const Publication = require('../schema/Publication');




const getInfoChercheur = async (req, res) => {
    try {
        const { email } = req.params;

        // Nombre de projets où le chercheur était chef
        const nbProjetsChef = await Projet.countDocuments({ ChefDeProjet: email });

        // Nombre de projets où le chercheur était membre
        const nbProjetsMembre = await Projet.countDocuments({ liste_members: email });

        // Nombre de publications
        const nbPublications = await Publication.countDocuments({ idCherch: email });

        // Nombre d'encadrements
        const nbEncadrements = await Encadrement.countDocuments({ "Encadrants._id": email });

        return res.status(200).json({nbProjetsChef, nbProjetsMembre, nbPublications, nbEncadrements});
   }   catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération du nombre de documents.');
   
    }
};

module.exports = getInfoChercheur

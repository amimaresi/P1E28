const mongoose = require('mongoose');
const Projet = require('../../../../schema/Projet');
const jwt = require('jsonwebtoken');
const ajouterModifierProjet = async (req, res) => {
    
    try {
        const { projetId } = req.params; // ID du projet à modifier (si fourni)
        //const { titre, dateDebut, dateFin, theme } = req.body; // Nouvelles informations du projet

        let projet; // Variable pour stocker le projet trouvé ou créé
        const idCherch = jwt.verify(req.cookies.jwt , process.env.SECRET_KEY).email
        console.log(idCherch)
        // Vérifier si un ID de projet est fourni dans les paramètres de la requête
        if (projetId) {
            // Si un ID est fourni, chercher le projet dans la base de données avec id du chef
            projet = await Projet.findOne({ _id: projetId, "ChefDeProjet": idCherch });

            // Si le projet n'existe pas, voir les membres
            if (!projet) {
                projet = await Projet.findOne({ _id: projetId, "liste_members": idCherch });
                if (!projet) { //s'il y a pas de membres
                return res.status(404).json({ message: "Le projet spécifié n'existe pas." });
            }
        }
            if (!req.body) {
                return res.status(400).json({ success: false, message: "Aucune donnée à mettre à jour n'a été fournie." });
            }
            console.log(req.body)
            await Projet.updateOne({ _id: projetId }, req.body);
        } 

        

        // Renvoyer une réponse avec le projet créé ou mis à jour
        return res.status(200).json({ message: "Les informations du projet ont été ajoutées ou mises à jour avec succès.", projet: projet });
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur interne du serveur
        console.error("Erreur lors de l'ajout ou de la modification du projet :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout ou de la modification du projet." });
    }
};

module.exports = ajouterModifierProjet;

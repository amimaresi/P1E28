const Projet = require('../../../../../schema/Projet');

const ajouterModifierProjet = async (req, res) => {
    const { projetId } = req.params; // ID du projet à modifier (si fourni)
    const { titre, dateDebut, dateFin, theme } = req.body; // Nouvelles informations du projet

    try {
        let projet; // Variable pour stocker le projet trouvé ou créé

        // Vérifier si un ID de projet est fourni dans les paramètres de la requête
        if (projetId) {
            // Si un ID est fourni, chercher le projet dans la base de données
            projet = await Projet.findById(projetId);

            // Si le projet n'existe pas, renvoyer une erreur
            if (!projet) {
                return res.status(404).json({ message: "Le projet spécifié n'existe pas." });
            }
        } 

        // Mettre à jour les informations du projet avec les valeurs fournies
        projet.titre = titre;
        projet.dateDebut = dateDebut;
        projet.dateFin = dateFin;
        projet.theme = theme;

        // Enregistrer le projet dans la base de données
        await projet.save();

        // Renvoyer une réponse avec le projet créé ou mis à jour
        return res.status(200).json({ message: "Les informations du projet ont été ajoutées ou mises à jour avec succès.", projet: projet });
    } catch (error) {
        // En cas d'erreur, renvoyer une erreur interne du serveur
        console.error("Erreur lors de l'ajout ou de la modification du projet :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout ou de la modification du projet." });
    }
};

module.exports = ajouterModifierProjet;

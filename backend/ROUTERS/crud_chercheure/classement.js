const Chercheur = require('./Schema/Chercheur'); // Importer le modèle Chercheur
const Publication = require('./Schema/Publication'); // Importer le modèle Publication
const mongoose = require('mongoose');

// Fonction pour ajouter ou modifier les classements des publications d'un chercheur
const ajouterModifierClassement = async (chercheurId, publicationId, nouveauxClassements) => {
    try {
        // Connexion à la base de données MongoDB
        await mongoose.connect('lien de bdd');

        // Vérifier si le chercheur existe
        const chercheur = await Chercheur.findById(chercheurId);
        if (!chercheur) {
            throw new Error('Le chercheur spécifié n\'existe pas.');
        }

        // Vérifier si la publication existe et appartient au chercheur
        const publication = await Publication.findById(publicationId);
        if (!publication) {
            throw new Error('La publication spécifiée n\'existe pas.');
        }
        if (publication._id.idCherch !== chercheurId) {
            throw new Error('La publication spécifiée n\'appartient pas au chercheur.');
        }

        // Mettre à jour les classements de la publication
        publication.Classement = nouveauxClassements;

        // Enregistrer la publication mise à jour
        const publicationMiseAJour = await publication.save();

        // Déconnexion de la base de données MongoDB
        await mongoose.disconnect();

        return publicationMiseAJour;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'ajout ou de la modification des classements :', error);
        throw error;
    }
};

module.exports = ajouterModifierClassement;

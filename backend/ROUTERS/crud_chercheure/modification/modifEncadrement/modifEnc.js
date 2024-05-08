const mongoose = require('mongoose');
const Encadrement = require('../../../../../schema/Encadrement');

const modifyEncadrement = async (req, res) => {
    try {
        const chercheurId = req.params; 
        const encadrementId = req.params; 

        // Vérifier si l'encadrement existe et s'il appartient au chercheur
        const encadrement = await Encadrement.findOne({ _id: encadrementId, "Encadrants._id": chercheurId });

        if (!encadrement) {
            return res.status(404).json({ success: false, message: "Encadrement non trouvé ou vous n'avez pas les autorisations pour le modifier." });
        }

        // Vérifier si des données à mettre à jour ont été envoyées dans la requête
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Aucune donnée à mettre à jour n'a été fournie." });
        }

        // Mettre à jour les champs de l'encadrement avec les données de la requête
        const { Type, Titre, Encadrants, Etudiants, AnneeD, AnneeF } = req.body;

        // Vérifier et mettre à jour chaque champ s'il est présent dans la requête
        if (Type) encadrement.Type = Type;
        if (Titre) encadrement.Titre = Titre;
        if (Encadrants && Array.isArray(Encadrants)) encadrement.Encadrants = Encadrants;
        if (Etudiants && Array.isArray(Etudiants)) encadrement.Etudiants = Etudiants;
        if (AnneeD) encadrement.AnneeD = AnneeD;
        if (AnneeF) encadrement.AnneeF = AnneeF;

        // Enregistrer les modifications
        await encadrement.save();

        return res.status(200).json({ success: true, message: "Encadrement modifié avec succès." });
    } catch (error) {
        console.error("Erreur lors de la modification de l'encadrement :", error);
        return res.status(500).json({ success: false, message: "Une erreur s'est produite lors de la modification de l'encadrement." });
    }
};

module.exports = modifyEncadrement;

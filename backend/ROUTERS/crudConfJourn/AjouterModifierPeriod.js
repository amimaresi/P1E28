const ConfJournal = require('../../schema/ConfJournal');

const ajouterModifierPeriode = async (req, res) => {
    try {
        const { acronym, type, periodicity } = req.body;

        // Vérifier si les données requises sont présentes dans la requête
        if (!acronym || !type || !periodicity) {
            return res.status(400).json({ success: false, message: "Les données requises sont manquantes." });
        }

        // Vérifier si la conférence ou le journal existe déjà
        let confJournal = await ConfJournal.findOne({ _id: acronym, type: type });

        if (!confJournal) {
            // Si la conférence ou le journal n'existe pas
            return res.status(400).json({ success: false, message: "La conférence ou le journal n'existe pas." });
        } else {
            // Si la conférence ou le journal existe, mettre à jour la périodicité
            confJournal.periodicity = periodicity;
        }

        // Enregistrer les modifications dans la base de données
        await confJournal.save();

        return res.status(200).json({ success: true, message: "Périodicité ajoutée/modifiée avec succès." });
    } catch (error) {
        console.error("Erreur lors de l'ajout/modification de la périodicité :", error);
        return res.status(500).json({ success: false, message: "Une erreur s'est produite lors de l'ajout/modification de la périodicité." });
    }
};

module.exports = ajouterModifierPeriode;

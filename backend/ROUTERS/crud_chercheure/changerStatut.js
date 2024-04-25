const Chercheur = require('../../schema/Chercheur');

const changeStatutChercheur = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id || !status) {
            return res.status(400).send('L\'identifiant du chercheur et le statut sont requis.');
        }

        const chercheur = await Chercheur.findById(id);

        if (!chercheur) {
            return res.status(404).send('Chercheur non trouvé.');
        }

        chercheur.statut = status;
        await chercheur.save();

        res.status(200).send('Statut du chercheur mis à jour avec succès.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la mise à jour du statut du chercheur.');
    }
};

module.exports = changeStatutChercheur;

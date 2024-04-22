const Chercheur = require('../../schema/Chercheur');

const modifierProfilChercheur = async (req, res) => {
    try {
        const { email } = req.params;
        const { attribut, valeur } = req.body;

        if (!email || !attribut || !valeur) {
            return res.status(400).send('L\'email du chercheur, l\'attribut et la valeur sont requis.');
        }

        const chercheur = await Chercheur.findById(email);

        if (!chercheur) {
            return res.status(404).send('Chercheur non trouvé.');
        }

        chercheur[attribut] = valeur;
        await chercheur.save();

        res.status(200).send('Profil du chercheur mis à jour avec succès.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la mise à jour du profil du chercheur.');
    }
};

module.exports = modifierProfilChercheur;

const Chercheur = require('../../../../schema/Chercheur');

const modifierProfilChercheur = async (req, res) => {
    try {
        const { _id } = req.params;
      //  const { attribut, valeur } = req.body;
         const obj = req.body;
         console.log(_id);
         console.log(obj);

       // if (!email || !attribut || !valeur) {
        if (!_id || !obj) {
            return res.status(400).send('L\'email du chercheur, l\'attribut et la valeur sont requis.');
        }

        const chercheur = await Chercheur.findById(_id);

        if (!chercheur) {
            return res.status(404).send('Chercheur non trouvé.');
        }

      //  chercheur[attribut] = valeur;
        await Chercheur.updateOne({_id} , obj);

        res.status(200).json('Profil du chercheur mis à jour avec succès.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).json('Une erreur s\'est produite lors de la mise à jour du profil du chercheur.');
    }
};

module.exports = modifierProfilChercheur;

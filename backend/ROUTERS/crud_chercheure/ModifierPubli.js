const Publication = require('../../schema/Publication');

const modifierPublication = async (req, res) => {
    try {
        const { idCherch, idPublication } = req.params;
        const { attribut, valeur } = req.body;

        let publication = await Publication.findOne({ _id: idPublication, idCherch });

        if (!publication) {
            return res.status(404).send('Publication non trouvée.');
        }

        publication[attribut] = valeur;
        await publication.save();

        res.status(200).send('Attribut de la publication modifié avec succès.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la modification de l\'attribut de la publication.');
    }
};

module.exports = modifierPublication;

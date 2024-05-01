const Publication = require('../../../../../schema/Publication');

const ajouterModifierClassement = async (req, res) => {
    try {
        const { idCherch, idPublication } = req.params;
        const { classements } = req.body;

        let publication = await Publication.findOne({ _id: idPublication, idCherch });

        if (!publication) {
            return res.status(404).send('Publication non trouvée.');
        }

        for (let i = 0; i < classements.length; i++) {
            const { Nom, Valeur } = classements[i];
            
            let index = publication.Classement.findIndex(c => c.Nom === Nom);

            if (index !== -1) {
                publication.Classement[index].Valeur = Valeur;
            } else {
                publication.Classement.push({ Nom, Valeur });
            }
        }

        await publication.save();

        res.status(200).send('Classements ajoutés ou modifiés avec succès.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de l\'ajout ou de la modification des classements.');
    }
};

module.exports = ajouterModifierClassement;

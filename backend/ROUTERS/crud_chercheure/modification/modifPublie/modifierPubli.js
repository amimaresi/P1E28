const Publication = require('../../../../schema/Publication');
const jwt = require('jsonwebtoken')
const modifierPublication = async (req, res) => {
    try {
        const   {id}  = req.params;
        console.log(id)
        console.log(req.cookies.jwt)
         
        const idCherch = jwt.verify(req.cookies.jwt , process.env.SECRET_KEY).email
       
        //const { attribut, valeur } = req.body;

        let publication = await Publication.findOne({ _id: id , idCherch });

        if (!publication) {
            return res.status(404).send('Publication non trouvée.');
        }

      //  publication[attribut] = valeur;
        await Publication.updateOne({_id: id} , req.body);

        res.status(200).send('Attribut de la publication modifié avec succès.');
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
        res.status(500).send('Une erreur s\'est produite lors de la modification de l\'attribut de la publication.');
    }
};

module.exports = modifierPublication;

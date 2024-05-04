const mongoose = require('mongoose')

// Load the model 
const Publication = require('../../schema/Publication')

const recherchePublication = (req, res) => {
    const options = {};

    if (req.query.Date) {
        options.Date = new RegExp(req.query.Date, 'i');
    }
    if (req.query.idCherch) {
        options.idCherch = req.query.idCherch;
    }
    if (req.query.confJourn) {
        options.confJourn = new RegExp(req.query.confJourn, 'i');
    }
    if (req.query.volume) {
        options.volume = new RegExp(req.query.volume, 'i');
    }
    if (req.query.pages) {
        options.pages = new RegExp(req.query.pages, 'i');
    }
    if (req.query.rang) {
        options.rang = req.query.rang;
    }
    if (req.query.Titre) {
        options.Titre = new RegExp(req.query.Titre, 'i');
    }
    if (req.query.Lien) {
        options.Lien = new RegExp(req.query.Lien, 'i');
    }
    if (req.query.Membres) {
        options.Membres = new RegExp(req.query.Membres, 'i');
    }
    if (req.query.Classement) {
        options['Classement.Nom'] = new RegExp(req.query.Classement, 'i');
    }
    if (req.query.MaisonEdistion) {
        options.MaisonEdistion = new RegExp(req.query.MaisonEdistion, 'i');
    }

    Publication.find(options)
        .then((resultats) => {
            res.status(200).json({ error: false, Publications: resultats });
        })
        .catch((erreur) => {
            console.error(erreur);
            res.status(400).json({ error: true });
        });
};

const queryPublication = async(req , res)=>{
    console.log(req.body)
 const{ Titre, Date, confJourn, idCherch, rang, MaisonEdition, volume, pages} = req.body
  
    if (!Titre && !Date && !confJourn && !idCherch && !rang && !MaisonEdition && !volume && !pages) return res.status(400).json({message: "Veuillez saisir un critère de recherche"})
    
    try {

        //trouve les publications qui respectent les conditions
        let query = {}
        if (Titre) query.Titre = {$regex: new RegExp('^'+Titre, 'i')}
       // if (Date) query.Date = {$regex: new RegExp('^'+Date, 'i')}
        if (confJourn) query.confJourn = {$regex: new RegExp('^'+confJourn, 'i')}
        if (idCherch) query.idCherch = {$regex: new RegExp('^'+idCherch, 'i')}
        if (rang) query.rang = rang 
        if (MaisonEdition) query.MaisonEdition = {$regex: new RegExp('^'+MaisonEdition, 'i')}
        if (volume) query.volume = {$regex: new RegExp('^'+volume, 'i')}
        if (pages) query.pages = {$regex: new RegExp('^'+pages, 'i')}

       console.log(query)      
        const docs = await Publication.find(query).exec()
        if(docs.length === 0) return res.status(400).json({message: "Aucune publication trouvée"})
      
         console.log(docs)
        res.status(200).json({Publications: docs})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

}
const queryPublicationByid =  async (req , res) =>{
    const id = req.params.id
    console.log("id " + id) 

    try {
        const doc = await Publication.findById(id)
        console.log(doc)

        res.status(200).json({Publications: doc})

    }
    catch(err){
        res.status(400).json({message: err.message})
    }

}

module.exports = {recherchePublication,queryPublication , queryPublicationByid} //export the function to be used 

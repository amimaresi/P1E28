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

    //ramene les publications qui ont le titre, la date, la conference et le chercheur voulu
    const subtitre = req.body.Titre
    console.log("titre" + req.body.Titre)
    const subdate1 = req.body.DateMin
    const subdate2 = req.body.DateMax 
    const subconf = req.body.acronym   //confJourn
    const subchercheur = req.body._idChercheur
    //volume //pages  //MaisonEdition  //Classement  //rang
    //console.log(req.body)
    if(!subtitre && !subdate1 && !subdate2 && !subconf && !subchercheur) return res.status(400).json({message: "Veuillez remplir au moins un champ"})

    
    try {
        //trouve les publications qui respectent les conditions
        let query = {}
       
        if(subtitre) {
            console.log("ssssssssssss")
            {query.Titre ={$regex: new RegExp('^'+subtitre, 'i')}}
        }
        // if(subdate){
        //     console.log("date" + subdate)
        //     query.Date = {$regex: new RegExp('^'+subdate, 'i')}}
        if(subconf) {query.confJourn = {$regex: new RegExp('^'+subconf, 'i')}}
        if(subchercheur){ query.idCherch = {$regex: new RegExp('^'+subchercheur, 'i')}}
         // Correction de l'année de début si elle n'existe pas
    if (subdate1) {
        const debutAnneeExist = await Publication.exists({ Date: { $regex: new RegExp('^' + subdate1, 'i') } });
        if (!debutAnneeExist) {
            const premierePublication = await Publication.findOne().sort({ Date: 1 }).exec();
            if (premierePublication) {
                query.Date = { $gte: premierePublication.Date };
            }
        } else {
            query.Date = { $gte: subdate1 };
        }
    }

    // Correction de l'année de fin si elle n'existe pas
    if (subdate2) {
        const finAnneeExist = await Publication.exists({ Date: { $regex: new RegExp('^' + subdate2, 'i') } });
        if (!finAnneeExist) {
            const dernierePublication = await Publication.findOne().sort({ Date: -1 }).exec();
            if (dernierePublication) {
                query.Date = { ...query.Date, $lte: dernierePublication.Date };
            }
        } else {
            query.Date = { ...query.Date, $lte: subdate2 };
        }
    }


        console.log(query)      
        const docs = await Publication.find(query).exec()
      
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

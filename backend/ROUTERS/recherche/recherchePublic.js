const mongoose = require('mongoose')

// Load the model 
const Publication = require('../../schema/Publication')


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

module.exports = {queryPublication , queryPublicationByid} //export the function to be used 
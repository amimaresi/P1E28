const mongoose = require('mongoose')

// Load the model 
const Publication = require('../../schema/Publication')


const queryPublication = async(req , res)=>{

    //ramene les publications qui ont le titre, la date, la conference et le chercheur voulu
    const subtitre = req.body.Titre
    console.log("titre" + req.body.Titre)
    const subdate = req.body.Date
    const subconf = req.body.acronym
    const subchercheur = req.body._idChercheur
    //console.log(req.body)
    if(!subtitre && !subdate && !subconf && !subchercheur) return res.status(400).json({message: "Veuillez remplir au moins un champ"})

    
    try {
        //trouve les publications qui respectent les conditions
        let query = {}
       
        if(subtitre) {query.Titre ={$regex: new RegExp('^'+subtitre, 'i')}}

        if(subdate){query.Date = {$regex: new RegExp('^'+subdate, 'i')}}
        if(subconf) {query.confJourn = {$regex: new RegExp('^'+subconf, 'i')}}
        if(subchercheur){ query.idCherch = {$regex: new RegExp('^'+subchercheur, 'i')}}
    
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

module.exports = {queryPublication , queryPublicationByid} //export the function to be used 
const mongoose = require('mongoose')

// Load the model 
const Publication = mongoose.model(process.env.NOM_COLLECTION_PUBLICATION)


const queryPublication = async(req , res)=>{

    //ramene les publications qui ont le titre, la date, la conference et le chercheur voulu
    const subtitre = req.body.titre
    const subdate = req.body.date
    const subconf = req.body.acronym
    const subchercheur = req.body._idChercheur
    //console.log(req.body)

    
    try {
        //trouve les publications qui respectent les conditions
        let query = {}
       
        if(subtitre) {query.titre ={$regex: new RegExp('^'+subtitre, 'i')}}

        if(subdate){query['_id.date'] = {$regex: new RegExp('^'+subdate, 'i')}}
        if(subconf) {query['_id.acronym'] = {$regex: new RegExp('^'+subconf, 'i')}}
        if(subchercheur){ query['_id._idChercheur'] = {$regex: new RegExp('^'+subchercheur, 'i')}}
    
       console.log(query)      
        const docs = await Publication.find(query).exec()
      
         console.log(docs)
        res.status(200).json({Publications: docs})
    } catch (err) {
        res.status(400).json({message: err.message})
    }

}

module.exports = queryPublication //export the function to be used 
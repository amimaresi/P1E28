const mongoose = require('mongoose')

// Load the model
const Chercheur = require('../../schema/Chercheur')


// Recherche par nom de chercheur
// const recherchParNom =  async (req , res )=>{
//     const subnom = req.body.nom
   
    

//     try {
//         //
//         const docs = await Chercheur.find({ 'nom': {$regex: new RegExp('^'+subnom, 'i')}}).exec();
//         console.log(docs);

//         res.status(200).json({Chercheurs: docs}); 
//     } catch (err) {
//         res.status(400).json({message: err.message});
//     }
   

// }


//  //Recherche par equipe de chercheur 
// const rechercheParEquie = async (req, res) => {
//     const subequi = req.body.nom
//     try {
//         const docs = await Chercheur.find({ 'equipe': {$regex: new RegExp('^'+subequi, 'i')}}).exec();
//         console.log(docs);
//         res.status(200).json({Chercheurs: docs}); 
//     } catch (err) {
//         res.status(400).json({message: err.message});
//     }
// }

// Recherche par nom et equipe de chercheur
 const queryChercheur = async(req , res)=>{
    console.log(req.body)
    const subnom = req.body.nom
    const subequi = req.body.equipe
    let query = {}
    if(subnom){
        console.log(subnom)
        query.nomComplet = {$regex: new RegExp('^'+subnom, 'i')}
     
    }
    if(subequi){
        
        console.log(subequi)
        query.Equipe = {$regex: new RegExp('^'+subequi, 'i')}
    }
    try {
        const docs = await Chercheur.find(query).exec()
        console.log(docs)
        if(docs.length === 0){
            return res.status(404).json({message: "Aucun chercheur trouvé"})
        }
        else{
        res.status(200).json({Chercheurs: docs})
        }
    } catch (err) {
        res.status(400).json({message: err.message})
    }

 }



module.exports = queryChercheur
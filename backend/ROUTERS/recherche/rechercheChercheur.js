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
    const { _id,Equipe ,Diplome,nomComplet , Qualité,EtablissementOrigine, contact ,  GradeRecherche, GradeEnsegnement, H_index , orcid , Matricule} = req.body
    
    if(!_id && !Equipe && !Diplome && !nomComplet && !Qualité && !EtablissementOrigine && !contact && !GradeRecherche && !GradeEnsegnement && !H_index && !orcid)
    {
        return res.status(400).json({message: "Veuillez saisir un critère de recherche"})
    }

    let query = {}
    if(Matricule)
    {
        console.log(Matricule)
        query.Matricule = {$regex: new RegExp('^'+Matricule, 'i')}
    }
    if(orcid)
    {
        console.log(orcid)
        query.orcid = {$regex: new RegExp('^'+orcid, 'i')}
    }

    if(nomComplet){
        console.log(nomComplet)
        query.nomComplet = {$regex: new RegExp('^'+nomComplet, 'i')}
     
    }
    if(Equipe){
        
        console.log(Equipe)
        query.Equipe = {$regex: new RegExp('^'+Equipe, 'i')}
    }
    if(_id)
    {
        console.log(_id)
        query._id = {$regex: new RegExp('^'+_id, 'i')}
    }
    if(Diplome)
    {
        console.log(Diplome)
        query.Diplome = {$regex: new RegExp('^'+Diplome, 'i')}
    }
    if(Qualité)
    {
        console.log(Qualité)
        query.Qualité = {$regex: new RegExp('^'+Qualité, 'i')}
    }
    if(EtablissementOrigine)
    {
        console.log(EtablissementOrigine)
        query.EtablissementOrigine = {$regex: new RegExp('^'+EtablissementOrigine, 'i')}
    }
    if(contact)
    {
        console.log(contact)
        query.contact = {$regex: new RegExp('^'+contact, 'i')}
    }
    if(GradeRecherche)
    {
        console.log(GradeRecherche)
        query.GradeRecherche = {$regex: new RegExp('^'+GradeRecherche, 'i')}
    }
    if(GradeEnsegnement)
    {
        console.log(GradeEnsegnement)
        query.GradeEnsegnement = {$regex: new RegExp('^'+GradeEnsegnement, 'i')}
    }
    if(H_index)
    {
        console.log(H_index)
       query.H_index = H_index
    }

    




    try {

       // const docs = await Chercheur.find(query).exec()
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

 const queryChercheurByid = async(req , res)=>{
    const _id = req.params.id
    try {
        const docs = await Chercheur.findOne({ _id}).exec()
        console.log(docs)
        res.status(200).json({Chercheur: docs})
    }
    catch(err){
        console.log(err)
        res.status(400).json({messag: "Desolé, il ya une erreur"})
    }
}



module.exports = {queryChercheur , queryChercheurByid}
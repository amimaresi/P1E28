const mongoose = require('mongoose')
const schema = mongoose.Schema

//cette schema represente les publications en attente de validation par le directeur 
//dans le cas ou le directeur accepte la publication, elle sera enregistree dans la collection publication
//et supprimee de cette collection
//sinon elle supprimee de cette collection directement

const fileDattentePublication = new schema({

        _id: {
           Date: {
               type: String,
       required: true
               },
               Cherch: {
                   type: mongoose.Schema.Types.String,
           ref: "chercheur"
               },
               confJourn: {
                   type: mongoose.Schema.Types.String,
                    ref: "confJournal"
               },
               volume: {
                   type:String,
                   required:true
               },
               pages: {
                   type: String,
                   required: true
               },
               rang: {
                   type: Number,
                   required: true
               }
       },
     Titre: {
       type: String,
       required: true
   },
   
   
   
   Lien: {
       type: String,
       required: true
   },
   Membres: [{ 
       type: String
   }],
   Classement: {
       type: String
   }
   }, {timestamps: true}

)

//export the model
module.exports = mongoose.model('fileDattentePublication' , fileDattentePublication)
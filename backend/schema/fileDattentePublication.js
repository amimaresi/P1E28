const mongoose = require('mongoose')
const schema = mongoose.Schema

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

module.exports = mongoose.model('fileDattentePublication' , fileDattentePublication)
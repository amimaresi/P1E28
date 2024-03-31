const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncadrementSchema = new Schema ({
 Type: { //pfe/docorat...
      type: String,
      required: true
 },
 Titre: {
    type: String,
    required: true
 },
 Encadrants: [ {
   nomComplet: {
      type:String,
    required: true
   },
    _id: { //email du chercheur
        type:String,
        ref: "chercheur"
      
    },
    role: {
      type:String,
      
    }
   }
 ],
 Etudiants: [ 
    {
        type: String
       
       
    }
 ],
 AnneeD: {
    type: String,
    required: true
 },
 AnneeF: {
    type: String,
    //required: true
 }
}, { timestamps: true });

const Encadrement = mongoose.model("encadrement",EncadrementSchema);
module.exports = Encadrement;

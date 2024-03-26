const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncadrementSchema = new Schema ({
 Type: {
      type: String,
      required: true
 },
 Titre: {
    type: String,
    required: true
 },
 Encadrants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chercheur"
    }
 ],
 Etudiants: [
    {
       
        Nom: {
            type: String,
                 
        },
        Prenom: {
            type: String,
            
        }
        
    }
 ],
 AnneeD: {
    type: String,
    required: true
 },
 AnneeF: {
    type: String,
    required: true
 }
}, { timestamps: true });

const Encadrement = mongoose.model("encadrement",EncadrementSchema);
module.exports = Encadrement;

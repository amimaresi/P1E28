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
        Matricule: {
            type: Number,
            required : true
        },
        Nom: {
            type: String,
            required: true     
        },
        Prenom: {
            type: String,
            required: true
        },
        Etablissement : {
            type: String
        }
    }
 ]
}, { timestamps: true });

const Encadrement = mongoose.model("encadrement",EncadrementSchema);
module.exports = Encadrement;

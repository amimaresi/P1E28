const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjetSchema = new Schema({
    _id: {  //numero
        type: Number,
        required: true
    },

    Titre: {
        type: String,
         required: true
    },
    ChefDeProjet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chercheur"
    },
    liste_members: [{ type: mongoose.Schema.Types.ObjectId, ref: "chercheur" }],

    DateDebut: {
        type: String,
        required: true
    },
    DateFin: {
        type: String,
         required: true
    },
   
    Theme: {
        type: String,
        
    }

}, { timestamps: true });

const Projet = mongoose.model("projet", ProjetSchema);
module.exports = Projet;

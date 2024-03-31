const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjetSchema = new Schema({
    _id: { //numero
        type: Number,
        required: true
    },

    Titre: {
        type: String,
        required: true
    },
    ChefDeProjet: { 
     type: String,
        ref: "chercheur"
      
       
    },
    liste_members: [{
       type: String,
        ref: "chercheur"
      
    }], 

    DateDebut: {
        type: String,
        required: true
    },
    DateFin: {
        type: String,

    },

    Theme: {
        type: String,

    }

}, { timestamps: true });

const Projet = mongoose.model("projet", ProjetSchema);
module.exports = Projet;

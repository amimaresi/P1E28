const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjetModel = new Schema ({
    numero: {
        type: Number,
        required: true
    },
    
    titre: {
        type: String
    },
    ChefDeProjet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chercheur"
    },
    DateDebut: {
        type: String,
        required: true
    },
    DateDeFin: {
        type: String
    },
    Description: {
        type: String,
        required: True
    },
    theme: {
        type: String,
        required: true
    }

}, {timestamps: true } );

const Projet = mongoose.model("projet",ProjetModel);
module.exports = Projet;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({

    Date: {
        type: String,
        required: true
    },
    idCherch: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: "chercheur"
    },
    confJourn: {
        type: String,
        required: true,
        ref: "confJournal"
    },
    volume: {
        type: String,
       
    },
    pages: {
        type: String,
       
    },
    rang: {
        type: Number,
        required: true

    },
    Titre: {
        type: String,
        required: true
    },



    Lien: {
        type: String,
        //required: true
    },
    Membres: [{
        type: String
    }],
    Classement: [{
        Nom: { type: String },
        Valeur: { type: String }
    }],
    MaisonEdistion: {
        type: String
    }



}, { timestamps: true });

const Publication = mongoose.model("publication", PublicationSchema);
module.exports = Publication;

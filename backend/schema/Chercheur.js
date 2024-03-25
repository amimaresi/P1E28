const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChercheurSchema = new Schema({
    _id: {   //email
        type: String,
        required: true
    },
    nomComplet: {
        type: String,
        required: true
    },
   
    Type: {
        type: String,
        required: true
    },
    GradeRecherche: {
        type: String,
        required: true
    },
    GradeEnsegnement: {
        type: String,
        required: true
    },
    H_index: {
        type: Number,
        required: true
    },
   /* email: {
        type: String,
        required: true
    },*/
    contact: {
        type: String,

    },
    projet: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projet"
    }],
    lien: {
        GoogleScholar: {
            type: String,
            
        },
        DBLP: {
            type: String
        },
        ResearchGate: {
            type: String
        }
    },
    image_path: {
        type: String,

    },
    statut: {
        type: String,
        required: true,
        default: "Actif"
    },
    Diplome: {
        type: String,
        required: true
    },
    Equipe: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Chercheur = mongoose.model("chercheur", ChercheurSchema);
module.exports = Chercheur;

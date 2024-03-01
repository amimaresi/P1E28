const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChercheurModel = new Schema ({
    id: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
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
    H_index: {
           type: Number,
           required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        
    },
    projet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projet"
    },
    lien: {
        GoogleScholar: {
            type: String,
            required: true
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
        
    }
   
}, { timestamps: true });

const Chercheur = mongoose.model("chercheur",ChercheurModel);
module.exports = Chercheur;
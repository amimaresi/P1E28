const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChercheurSchema = new Schema ({
    _id: { //email
        type:String,
        required: true
    },
    nomComplet: { //prenom nom
        type: String,
        required: true
    },
   
    Qualité: {
        type: String,
        required: true
    },
    GradeEnsegnement: {
        type: String,
        required: true
    },
    GradeRecherche: {
        type: String,
        required: true
    },
    H_index: {
           type: Number,
           //required: true
    },
   
    contact: {
        type: String,
     },
    projet: [{
        type: Number
}],
publications: [{
    Date: {
        type: String,
        required: true
        },
        idCherch: {
            type: String
        },
        confJourn: {
            type: String
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
}

],
    lien: {
        GoogleScholar: {
            type: String,
            
        },
        DBLP: {
            type: String
        },
        ResearchGate: {
            type: String
        },
        ComptePersonnelle: {
            type: String
        }
    },
    image_path: {
        type: String,
        
    },
    EtablissementOrigine: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        required: true,
        default: "actif"
    },
    Diplome: {
        type: String,
        required: true
    },
    Equipe: {
        type: String,
        //required: true
    }
   
}, { timestamps: true });

const Chercheur = mongoose.model("chercheur",ChercheurSchema);
module.exports = Chercheur;

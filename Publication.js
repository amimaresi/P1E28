const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema ({
Titre: {
    type: String,
    required: true
},
Conference_Journal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "confJournal",
    required: true
},
Thematique: {
    type: String
},
Description: {
    type: String,
    required: true
},
Lien: {
    type: String,
    required: true
},
RangChercheur: [
    {
        Chercheur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chercheur",
        required: true
        },
        Rang: {
            type: Number,
            required: true
        }
    }
],
Volume: {
    type: String,
    required: true
},
Page: {
    PageDebut : {
        type: Number
    },
    PageFin: {
        type:Number
    }
},
Date : {
    type: String,
    required: true
}
}, {timestamps: true});

const Publication = mongoose.model("publication", PublicationSchema);
module.exports = Publication;

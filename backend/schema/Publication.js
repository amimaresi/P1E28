const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema ({
     _id: {
        Date: {
            type: String,
    required: true
            },
            Cherch: {
                type: mongoose.Schema.Types.String,
        ref: "chercheur"
            },
            confJourn: {
                type: mongoose.Schema.Types.String,
                 ref: "confJournal"
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
    },
  Titre: {
    type: String,
    required: true
},



Lien: {
    type: String,
    required: true
},
Membres: [{ 
    type: String
}],
Classement: {
    type: String
}
}, {timestamps: true});

const Publication = mongoose.model("publication", PublicationSchema);
module.exports = Publication;

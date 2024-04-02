const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfJournSchema = new Schema ({
_id: {     //acronyme
    type: String,
    required: true
},

type: { //journal/conf..
    type: String,
    required: true
},
nom: {
    type: String,
    required: true
},
periodicite: {
    type: String,
    required: true
},
lien: {
    type: String,
    //required: true
}
}, { timestamps: true });

const ConfJournal = mongoose.model("confJournal",ConfJournSchema);
module.exports = ConfJournal;

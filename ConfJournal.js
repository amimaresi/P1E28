const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfJournModel = new Schema ({
acronyme: {
    type: String,
    required: true
},
classement: {
    type: String,
    required: true
},
publications: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "publication"
    }
]
}, { timestamps: true });

const ConfJournal = mongoose.model("confJournal",ConfJournModel);
module.exports = ConfJournal;
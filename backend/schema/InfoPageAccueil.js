const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoPageAcceuilSchema = new Schema ({
_id: {     //acronyme
    type: Number,
    required: true
},

title: { //journal/conf..
    type: String,
    required: true
},
paragraphe: {
    type: String,
   // required: true
},
img: {
    type: String,
    //required: true
},
Subject: {
    type: String,
    //required: true
}
}, { timestamps: true });

const InfoPageAcceuil = mongoose.model("InfoPageAcc",InfoPageAcceuilSchema);
module.exports = InfoPageAcceuil;

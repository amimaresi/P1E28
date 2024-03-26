const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true

    },
    passeword: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "chercheur"
    }
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);
module.exports = User;
const mongoose = require("mongoose");

const settings_schema = mongoose.Schema({
    _id://setting name 
    {
        type: String,
        required: true
    },
    setting_value:
    {
        type: Object,
    }




});
const Setting = mongoose.model('setting', settings_schema);
module.exports = Setting
"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  UserProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chercheur"
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
    "default": "chercheur"
  }
}, {
  timestamps: true
});
var User = mongoose.model("user", UserSchema);
module.exports = User;
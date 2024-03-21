"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProjetSchema = new Schema({
  Num: {
    type: String,
    required: true
  },
  Titre: {
    type: String
  },
  ChefDeProjet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chercheur"
  },
  liste_members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "chercheur"
  }],
  DateDebut: {
    type: String,
    required: true
  },
  DateFin: {
    type: String
  },
  Description: {},
  Theme: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Projet = mongoose.model("projet", ProjetSchema);
module.exports = Projet;
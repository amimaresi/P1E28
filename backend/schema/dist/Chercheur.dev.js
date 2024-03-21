"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ChercheurSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  GradeRecherche: {
    type: String,
    required: true
  },
  H_index: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projet"
  },
  lien: {
    GoogleScholar: {
      type: String,
      required: true
    },
    DBLP: {
      type: String
    },
    ResearchGate: {
      type: String
    }
  },
  image_path: {
    type: String
  }
}, {
  timestamps: true
});
var Chercheur = mongoose.model("chercheur", ChercheurSchema);
module.exports = Chercheur;
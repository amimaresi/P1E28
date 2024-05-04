const express = require('express');
const routerConf = express.Router();

const ajouterModifierPeriode = require("./AjouterModifierPeriod");


routerConf.post('/confJourn/ajouterPeriode', ajouterModifierPeriode); //ajouter modifier periodicité
module.exports = routerConf

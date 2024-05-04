const express = require('express');
const router = express.Router;

const ajouterModifierPeriode = require("./AjouterModifierPeriod");


router.post('/confJourn/ajouterPeriode', ajouterModifierPeriode); //ajouter modifier periodicité
module.exports = router

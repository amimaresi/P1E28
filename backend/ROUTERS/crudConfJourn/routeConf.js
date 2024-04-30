const express = require('express');
const router = express.Router;
const {rechercheConference, rechercherConfParId} = require("../../recherche/recherche_confJourn");
const ajouterModifierPeriode = require("./AjouterModifierPeriod");

router.get('/confJourn?',rechercheConference); //recherche
router.get('/confJourn/:id', rechercherConfParId); //recherche par id
router.post('/confJourn/ajouterPeriode', ajouterModifierPeriode); //ajouter modifier periodicité
module.exports = router:

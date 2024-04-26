const express = require('express');
const router = express.Router;
const {rechercheConference, rechercherConfParId} = require("../recherche/recherche_confJourn");

router.get('/confJourn?',rechercheConference);
router.get('/confJourn/:id', rechercherConfParId);
module.exports = router:

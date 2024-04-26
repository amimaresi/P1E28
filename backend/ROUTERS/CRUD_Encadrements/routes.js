const express = require('express');
const router = express.Router;
const insererEncadrement = require("./insert_form_encadrement");
const {rechercherEncadrement , rechercherEncParId} = require("../recherche/reche_encadrement")


router.post('/encadrement/ajouter',insererEncadrement);
router.get('/encadrement?', rechercherEncadrement );
router.get('/encadrement/:id', rechercherEncParId );

module.exports = router:

const express = require('express');
const routerEnc = express.Router();
const insererEncadrement = require("./insert_form_encadrement");
const {rechercherEncadrement , rechercherEncParId} = require("../recherche/reche_encadrement")


routerEnc.post('/encadrement/ajouter',insererEncadrement);
routerEnc.get('/encadrement?', rechercherEncadrement );
routerEnc.get('/encadrement/:id', rechercherEncParId );

module.exports = routerEnc;

const express = require('express');
const routerEnc = express.Router();
const insererEncadrement = require("./insert_form_encadrement");


routerEnc.post('/encadrement/ajouter',insererEncadrement);


module.exports = routerEnc;

const express = require("express")
const modifierProfilChercheur = require('./modifInfoProfile/AjouterModifierProfile')
const modifierPublication = require('./modifPublie/modifierPubli')
const modifyEncadrement = require('./modifEncadrement/modifEnc')
const ajouterModifierProjet = require('./modifProjet/modifProj')
const modificationRouter = express.Router()

modificationRouter.put('/chercheur/:_id', modifierProfilChercheur)
modificationRouter.put('/Publication/:_id', modifierPublication)
modificationRouter.put('/encadrement/:_id', modifyEncadrement)
modificationRouter.put('/projet/:projetId', ajouterModifierProjet)

module.exports = modificationRouter
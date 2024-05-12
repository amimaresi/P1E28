const modifierProfilChercheur = require('./AjouterModifierProfile');

const ModifierCherRouter = require('express').Router();

ModifierCherRouter.put('/chercheur/:_id', modifierProfilChercheur);

module.exports = ModifierCherRouter;
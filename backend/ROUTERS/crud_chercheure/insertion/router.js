const express = require('express')
const insertionChercheur = require('./insertionChercheur')
const cherchRoute = express.Router()


cherchRoute.post('/insertionChercheur', insertionChercheur)

module.exports = cherchRoute
const express = require('express')
const insertionChercheur = require('./insertionChercheur')
const insertionPublication = require('./insertionPublication')
const cherchRoute = express.Router()

cherchRoute.post('/inserPub',insertionPublication)
cherchRoute.post('/insertionChercheur', insertionChercheur)

module.exports = cherchRoute

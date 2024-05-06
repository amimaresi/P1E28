const express = require('express')
const {nombreDesPubParAnnees} = require('./publicationStatistique')
const { encadrementsParAnneeSansT, master2ParAnnee,pfeParAnnee, doctoratParAnnee } = require('./encadrementStatistique')
const getCollectionCount = require('./getCollectionCount')
const { projetParAnne } = require('./projetStatistique')
const staticRouter = express.Router()

staticRouter.post('/publication' , nombreDesPubParAnnees)
staticRouter.post('/encadrement' ,encadrementsParAnneeSansT)
staticRouter.post('/doctorat' , doctoratParAnnee)
staticRouter.post('/pfe' , pfeParAnnee)
staticRouter.post('/master', master2ParAnnee)
staticRouter.post('/projet',projetParAnne)
staticRouter.get('/countDocuments' , getCollectionCount)

module.exports = staticRouter
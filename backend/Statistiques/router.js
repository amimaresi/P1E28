const express = require('express')
const {nombreDesPubParAnnees} = require('./publicationStatistique')
const { nombreEncadrement, pfeParAnnee, doctoratParAnnee } = require('./encadrementStatistique')

const staticRouter = express.Router()

staticRouter.post('/publication' , nombreDesPubParAnnees)
staticRouter.post('/projet' , nombreDesPubParAnnees)
staticRouter.post('/encadrement' , nombreEncadrement)
staticRouter.post('/doctorat' , doctoratParAnnee)
staticRouter.post('/pfe' , pfeParAnnee)

module.exports = staticRouter
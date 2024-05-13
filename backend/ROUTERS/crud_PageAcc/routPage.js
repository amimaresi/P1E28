const insererDoc = require('./insertion')
const supprimer = require('./supression')
const getChercheursInfos = require('./leaders')
const PageRoute = require('express').Router()

PageRoute.post('/insertion',insererDoc)
PageRoute.delete('/supression/:id',supprimer)
PageRoute.get('/leaders',getChercheursInfos)

module.exports = PageRoute

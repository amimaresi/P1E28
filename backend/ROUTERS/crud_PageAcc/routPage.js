const insererDoc = require('./insertion')
const supprimer = require('./supression')
const PageRoute = require('express').Router()

PageRoute.post('/insertion',insererDoc)
PageRoute.delete('/supression',supprimer)

module.exports = PageRoute

const insererDoc = require('./insertion')

const PageRoute = require('express').Router()

PageRoute.post('/insertion',insererDoc)

module.exports = PageRoute

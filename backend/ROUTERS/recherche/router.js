const {queryChercheur , queryChercheurByid} = require('./rechercheChercheur')
const {queryPublication , queryPublicationByid} = require('./recherchePublic')
const RechercheRouter = require('express').Router()


RechercheRouter.post('/Chercheur', queryChercheur)
RechercheRouter.get('/Chercheur/:id', queryChercheurByid)
RechercheRouter.post('/Publication', queryPublication)
RechercheRouter.get('/Publication/:id', queryPublicationByid)



module.exports = RechercheRouter 
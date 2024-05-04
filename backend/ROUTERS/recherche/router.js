const {queryChercheur , queryChercheurByid} = require('./rechercheChercheur')
const {queryPublication , queryPublicationByid} = require('./recherchePublic')
const RechercheRouter = require('express').Router()


RechercheRouter.post('/Chercheur', queryChercheur)
RechercheRouter.get('/Chercheur/:id', queryChercheurByid)
RechercheRouter.post('/publication', queryPublication)
RechercheRouter.get('/publication/:id', queryPublicationByid)



module.exports = RechercheRouter 
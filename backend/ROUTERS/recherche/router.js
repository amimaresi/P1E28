const {queryChercheur , queryChercheurByid} = require('./rechercheChercheur')
const {queryPublication , queryPublicationByid} = require('./recherchePublic')
const {rechercheConference, rechercherConfParId} = require('./recherche_confJourn')
const RechercheRouter = require('express').Router()


RechercheRouter.post('/Chercheur', queryChercheur)
RechercheRouter.get('/Chercheur/:id', queryChercheurByid)
RechercheRouter.post('/Publication', queryPublication)
RechercheRouter.get('/Publication/:id', queryPublicationByid)
RechercheRouter.post('/ConfJourn', rechercheConference )
RechercheRouter.get('/ConfJourn/:id', rechercherConfParId )



module.exports = RechercheRouter 

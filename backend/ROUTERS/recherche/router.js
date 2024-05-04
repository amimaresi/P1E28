const {queryChercheur ,queryToutChercheur, queryChercheurByid} = require('./rechercheChercheur')
const {queryPublication , queryPublicationByid} = require('./recherchePublic')
const {rechercheConference, rechercherConfParId} = require('./recherche_confJourn')
const { queryEncadrement, queryEncadrementById } = require('./reche_encadrement')
const { queryProjet, projet_by_id } = require('./recherche-projet')
const RechercheRouter = require('express').Router()


RechercheRouter.post('/Chercheur', queryChercheur)
RechercheRouter.get('/Chercheur/:id', queryChercheurByid)
RechercheRouter.get('toutChercheur', queryToutChercheur)

RechercheRouter.post('/Publication', queryPublication)
RechercheRouter.get('/Publication/:id', queryPublicationByid)

RechercheRouter.post('/ConfJourn', rechercheConference )
RechercheRouter.get('/ConfJourn/:id', rechercherConfParId )

RechercheRouter.post('/encadrement', queryEncadrement )
RechercheRouter.get('/encadrement/:id', queryEncadrementById )

RechercheRouter.post('/projet',  queryProjet)
RechercheRouter.get('/projet/:id', projet_by_id )





module.exports = RechercheRouter 

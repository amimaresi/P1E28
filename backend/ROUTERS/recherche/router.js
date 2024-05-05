const {queryChercheur ,queryToutChercheur, queryChercheurByid} = require('./rechercheChercheur')
const {recherchePublication,queryPublication , queryPublicationByid} = require('./recherchePublic')
const {rechercheConf, rechercheConference, rechercherConfParId} = require('./recherche_confJourn')
const { rechercherEncadrement, queryEncadrement, queryEncadrementById } = require('./reche_encadrement')
const {projet_recherche, queryProjet, projet_by_id } = require('./recherche-projet')
const RechercheRouter = require('express').Router()


RechercheRouter.post('/Chercheur', queryChercheur)
RechercheRouter.get('/Chercheur/:id', queryChercheurByid)
RechercheRouter.get('/Chercheur', queryToutChercheur)

RechercheRouter.post('/Publication', queryPublication)
RechercheRouter.get('/Publication',recherchePublication)
RechercheRouter.get('/Publication/:id', queryPublicationByid)

RechercheRouter.post('/ConfJourn', rechercheConference )
RechercheRouter.get('/ConfJourn',rechercheConf)
RechercheRouter.get('/ConfJourn/:id', rechercherConfParId )

RechercheRouter.post('/encadrement', queryEncadrement )
RechercheRouter.get('/encadrement', rechercherEncadrement)
RechercheRouter.get('/encadrement/:id', queryEncadrementById )

RechercheRouter.post('/projet',  queryProjet)
RechercheRouter.get('/projet',projet_recherche )
RechercheRouter.get('/projet/:id', projet_by_id )





module.exports = RechercheRouter 

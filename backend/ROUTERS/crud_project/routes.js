const express = require('express');
const crud = express.Router();
const { nouveau_projet } = require('./controllers');
const { projet_recherche, projet_by_id } = require('../recherche/recherche-projet');
crud.route('/projet').post(nouveau_projet)

crud.get('/projet/search?', projet_recherche);
crud.get('/projet/search/:id',projet_by_id);
module.exports = crud;

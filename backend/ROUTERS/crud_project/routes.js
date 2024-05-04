const express = require('express');
const crud = express.Router();
const { nouveau_projet } = require('./controllers');

crud.route('/projet').post(nouveau_projet)


module.exports = crud;

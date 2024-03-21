"use strict";

var User = require('../../schema/User');

var Projet = require('../../schema/Projet');

var nouveau_projet = function nouveau_projet(req, res) {
  var _req$body, Num, Titre, DateDebut, DateFin, chefProjet, liste_membre, Description, Theme, chef, members, i, user, projet;

  return regeneratorRuntime.async(function nouveau_projet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, Num = _req$body.Num, Titre = _req$body.Titre, DateDebut = _req$body.DateDebut, DateFin = _req$body.DateFin, chefProjet = _req$body.chefProjet, liste_membre = _req$body.liste_membre, Description = _req$body.Description, Theme = _req$body.Theme; //handling chefProjet Id;

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            username: chefProjet
          }));

        case 4:
          chef = _context.sent;

          if (chef) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: true
          }));

        case 7:
          // handling  list members ids
          list_membre = liste_membre.split(" ");
          members = [];
          i = 0;

        case 10:
          if (!(i < list_membre.length)) {
            _context.next = 20;
            break;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(User.findOne({
            username: list_membre[i]
          }));

        case 13:
          user = _context.sent;

          if (user) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: true
          }));

        case 16:
          members.push(user._id);

        case 17:
          i++;
          _context.next = 10;
          break;

        case 20:
          // creating new project
          projet = new Projet({
            Num: Num,
            Titre: Titre,
            DateDebut: DateDebut,
            DateFin: DateFin,
            liste_membre: members,
            Description: Description,
            Theme: Theme,
            chefProjet: chef
          });
          _context.next = 23;
          return regeneratorRuntime.awrap(projet.save());

        case 23:
          res.status(201).json({
            error: false
          });
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(404).json({
            error: true
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
};

module.exports = {
  nouveau_projet: nouveau_projet
};
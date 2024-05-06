  const mongoose = require("mongoose");
  const Publication = require("../schema/Publication");
  const { json } = require("express");





  const nombreDesPubParAnnees = async(req, res) => {
      try {
          let pubTabAvecDouble;
          if (req.body) {
              let {
                  dateDebut,
                  dateFin
              } = req.body;
              console.log(dateDebut, dateFin)


              pubTabAvecDouble = await Publication.find({
                  Date: {
                      $gt: Number(dateDebut),
                      $lt: Number(dateFin)
                  }
              })
          } else {

              pubTabAvecDouble = await Publication.find();
          }
          const pubTab = [];
          let j = 0;
          for (let pub of pubTabAvecDouble) {
              j = 0;
              for (let i = 0; i < pubTab.length; i++) {
                  if (pub.Lien == pubTab[i].Lien)
                      j = 1;
              }

              if (j == 0) pubTab.push(pub);
          }
          pubTab.sort((a, b) => Number(a.Date) - Number(b.Date))
          const pubTabHisto = [];

          let pubOfTheYear = [];
          let year = (pubTab.length > 0) ? pubTab[0].Date : 0;

          for (let i = 0; i < pubTab.length; i++) {
              if (pubTab[i].Date == year) pubOfTheYear.push(pubTab[i])
              else {
                  pubTabHisto.push({ year, pubOfTheYear });

                  year = pubTab[i].Date;
                  pubOfTheYear = [pubTab[i]];


              }

          }
          pubTabHisto.push({ year, pubOfTheYear });
          let numberOfPubOfYear = [];
          for (let i = 0; i < pubTabHisto.length; i++) {
              numberOfPubOfYear.push({ year: pubTabHisto[i].year, count: pubTabHisto[i].pubOfTheYear.length });
          }


          res.json({ nombreTotalDesPub: pubTab.length, numberOfPubOfYear, publication: pubTabHisto })



      } catch (err) {
          console.log(err);
          res.status(404).json({ error: true })
      }



  }






  module.exports = { nombreDesPubParAnnees }
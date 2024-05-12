  const mongoose = require("mongoose");
  const Publication = require("../schema/Publication");
  const { json } = require("express");





  const nombreDesPubParAnnees = async(req, res) => {
    try {
        let pubTabAvecDouble;
        let { dateDebut, dateFin } = req.body;

        if (dateDebut.localeCompare(dateFin) === 1) {
            throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        }

        // Récupération de toutes les publications dans l'intervalle spécifié
        if (req.body) {
            pubTabAvecDouble = await Publication.find({
                Date: { $regex: new RegExp(`^(${dateDebut}|${dateFin})`) }
            });
        } else {
            pubTabAvecDouble = await Publication.find();
        }

        // Création d'un tableau contenant toutes les années dans l'intervalle spécifié
        const yearsInRange = Array.from(
            { length: parseInt(dateFin) - parseInt(dateDebut) + 1 },
            (_, index) => parseInt(dateDebut) + index
        );

        // Comptage du nombre de publications par année
        const numberOfPubOfYear = [];
        for (const year of yearsInRange) {
            const publicationsOfYear = pubTabAvecDouble.filter(pub => {
                // Extraire l'année de la date et comparer
                const pubYear = parseInt(pub.Date.substring(0, 4));
                return pubYear === year;
            });
            numberOfPubOfYear.push({ year: parseInt(year), count: publicationsOfYear.length });
        }

        res.json({ numberOfPubOfYear });

    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
      /*try {
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
      }*/



  }






  module.exports = { nombreDesPubParAnnees }

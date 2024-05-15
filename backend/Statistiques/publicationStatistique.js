  const mongoose = require("mongoose");
  const Publication = require("../schema/Publication");
  const { json } = require("express");





  const nombreDesPubParAnnees = async(req, res) => {
    try {
        const { dateDebut, dateFin } = req.body;

        // if (dateDebut.localeCompare(dateFin) === 1) {
        //     throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        // }
        const publications = await Publication.find({
            Date: {
                $gte: Number(dateDebut),
                $lte: Number(dateFin)
            }
        }).sort({ Date: 1 });

        // Créer un tableau d'années entre dateDebut et dateFin
        const yearsInRange = Array.from({ length: Number(dateFin) - Number(dateDebut) + 1 }, (_, index) => Number(dateDebut) + index);

        // Compter le nombre d'encadrements par année
        const publicationsCountByYear = publications.reduce((acc, publication) => {
            const year = publication.Date;
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        // Créer un tableau avec le nombre d'encadrements par année
        const numberOfPubOfYear = yearsInRange.map(year => ({
            year,
            count: publicationsCountByYear[year] || 0 // Utiliser 0 si aucune valeur trouvée pour cette année
        }));

        res.json({ 
            numberOfPubOfYear
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
   
  }






  module.exports = { nombreDesPubParAnnees }

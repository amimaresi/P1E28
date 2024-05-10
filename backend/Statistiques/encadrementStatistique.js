const Encadrement = require("../schema/Encadrement");
/*const nombreEncadrement = async(req, res) => {

    try {
        let dateDebut;
        if (req.body) dateDebut = req.body.dateDebut
        
        else dateDebut = 1966;
        

        const encadrement = await Encadrement.find({ AnneeD: { $gt: dateDebut }});
        // TYPE : PFE AND DOCTORAT 
        let pfe = 0,
            doctorat = 0;
        for (let i = 0; i < encadrement.lenght; i++) {
            if (encadrement[i].Type == "PFE") pfe++;
            else doctorat++;


        }

        console.log(encadrement.length);

        res.status(200).json({ nombreEncadrement: encadrement.length, nombrePfe: pfe, nombreDoctorat: doctorat })







    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });

    }




}





const pfeParAnnee = async(req, res) => {
    try {


        let {
            dateDebut,
            dateFin
        } = req.body;


        let pfeTab = await Encadrement.find({
            AnneD: {
                $gt: Number(dateDebut),
                $lt: Number(dateFin)
            }
        }).getFilter((e) => e.Type == "PFE");



        pfeTab.sort((a, b) => Number(a.AnneeD) - Number(b.AnneD))
        let pfeOfTheYear = [];
        let pfeTabHisto = [];

        let year = (pfeTab.length > 0) ? pfeTab[0].AnneD : 0;

        for (let i = 0; i < pfeTab.length; i++) {
            if (pfeTab[i].AnneD == year) pfeOfTheYear.push(pfeTab[i])
            else {
                pfeTabHisto.push({ year, pfeOfTheYear });

                year = pfeTab[i].AnneD;
                pfeOfTheYear = [pfeTab[i]];


            }

        }
        pfeTabHisto.push({ year, pfeOfTheYear });
        let numberOfPfeOfYear = [];
        for (let i = 0; i < pfeTabHisto.length; i++) {
            numberOfPfeOfYear.push({ year: pfeTabHisto[i].year, count: pfeTabHisto[i].pfeOfTheYear.length });
        }


        res.json({ nombreTotalDesPfe: pfeTab.length, numberOfPfeOfYear, pfe: pfeTabHisto })



    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true })
    }



}


const doctoratParAnnee = async(req, res) => {
    try {


        let {
            dateDebut,
            dateFin
        } = req.body;


        let doctoratTab = await Encadrement.find({
            AnneD: {
                $gt: Number(dateDebut),
                $lt: Number(dateFin)
            }
        }).getFilter((encadrement) => encadrement.Type == "DOCTORAT")






        doctoratTab.sort((a, b) => Number(a.AnneeD) - Number(b.AnneD))
        let doctoratOfTheYear = [];
        let doctoratTabHisto = [];

        let year = (doctoratTab.length > 0) ? doctoratTab[0].AnneD : 0;

        for (let i = 0; i < doctoratTab.length; i++) {
            if (doctoratTab[i].AnneD == year) doctoratOfTheYear.push(doctoratTab[i])
            else {
                doctoratTabHisto.push({ year, doctoratOfTheYear });

                year = doctoratTab[i].AnneD;
                doctoratOfTheYear = [doctoratTab[i]];


            }

        }
        doctoratTabHisto.push({ year, doctoratOfTheYear });
        let numberOfDoctoratOfYear = [];
        for (let i = 0; i < doctoratTabHisto.length; i++) {
            numberOfDoctoratOfYear.push({ year: doctoratTabHisto[i].year, count: doctoratTabHisto[i].doctoratOfTheYear.length });
        }


        res.json({ nombreTotalDesDoctorat: doctoratTab.length, numberOfDoctoratOfYear, doctorat: doctoratTabHisto })



    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true })
    }



}*/
const encadrementsParAnneeSansT = async (req, res) => {
   /* try {
        const { dateDebut, dateFin } = req.body;

        const encadrements = await Encadrement.find({
            AnneeD: {
                $gte: Number(dateDebut), // Utilisation de $gte pour inclure également dateDebut
                $lte: Number(dateFin)    // Utilisation de $lte pour inclure également dateFin
            }
        }).sort({ AnneeD: 1 });

        let encadrementsParAnnee = [];
        let currentYear = Number(dateDebut); // Commence à partir de dateDebut

        encadrements.forEach(encadrement => {
            const encadrementYear = encadrement.AnneeD;

            // Ajoute les années manquantes avec 0 encadrements
            while (currentYear < encadrementYear) {
                encadrementsParAnnee.push({ year: currentYear, count: 0 });
                currentYear++;
            }

            // Vérifie si l'année existe déjà, si oui, incrémente le compteur
            const existingYear = encadrementsParAnnee.find(item => item.year === encadrementYear);
            if (existingYear) {
                existingYear.count++;
            } else {
                // Ajoute l'année avec le nombre d'encadrements
                encadrementsParAnnee.push({ year: encadrementYear, count: 1 });
            }
            
            currentYear++;
        });

        // Ajoute les années restantes avec 0 encadrements jusqu'à dateFin
        while (currentYear <= Number(dateFin)) {
            encadrementsParAnnee.push({ year: currentYear, count: 0 });
            currentYear++;
        }

        encadrementsParAnnee = encadrementsParAnnee.map(item => ({ year: parseInt(item.year), count: item.count }));
        res.json({ 
            encadrementsParAnnee 
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }*/
    try {
        const { dateDebut, dateFin } = req.body;

        if (dateDebut.localeCompare(dateFin) === 1) {
            throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        }
        const encadrements = await Encadrement.find({
            AnneeD: {
                $gte: Number(dateDebut), // Utilisation de $gte pour inclure également dateDebut
                $lte: Number(dateFin)    // Utilisation de $lte pour inclure également dateFin
            }
        }).sort({ AnneeD: 1 });

        let encadrementsParAnnee = [];
        let currentYear = Number(dateDebut); // Commence à partir de dateDebut

        encadrements.forEach(encadrement => {
            const encadrementYear = encadrement.AnneeD;

            // Ajoute les années manquantes avec 0 encadrements
            while (currentYear < encadrementYear) {
                encadrementsParAnnee.push({ year: currentYear, count: 0 });
                currentYear++;
            }

            // Vérifie si l'année existe déjà, si oui, incrémente le compteur
            const existingYear = encadrementsParAnnee.find(item => item.year === encadrementYear);
            if (existingYear) {
                existingYear.count++;
            } else {
                // Ajoute l'année avec le nombre d'encadrements
                encadrementsParAnnee.push({ year: encadrementYear, count: 1 });
            }
        });

        // Ajoute les années restantes avec 0 encadrements jusqu'à dateFin inclus
        while (currentYear <= Number(dateFin)) {
            encadrementsParAnnee.push({ year: currentYear, count: 0 });
            currentYear++;
        }

        encadrementsParAnnee = encadrementsParAnnee.map(item => ({ year: parseInt(item.year), count: item.count }));
        res.json({ 
            encadrementsParAnnee 
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
    
};

const encadrementsParAnnee = async (req, res, type) => {
  
    try {
        const { dateDebut, dateFin } = req.body;

        if (dateDebut.localeCompare(dateFin) === 1) {
            throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        }
        const encadrements = await Encadrement.find({
            AnneeD: {
                $gte: Number(dateDebut),
                $lte: Number(dateFin)
            },
            Type: type
        }).sort({ AnneeD: 1 });

        // Créer un tableau d'années entre dateDebut et dateFin
        const yearsInRange = Array.from({ length: Number(dateFin) - Number(dateDebut) + 1 }, (_, index) => Number(dateDebut) + index);

        // Compter le nombre d'encadrements par année
        const encadrementsCountByYear = encadrements.reduce((acc, encadrement) => {
            const year = encadrement.AnneeD;
            acc[year] = acc[year] ? acc[year] + 1 : 1;
            return acc;
        }, {});

        // Créer un tableau avec le nombre d'encadrements par année
        const encadrementsParAnnee = yearsInRange.map(year => ({
            year,
            count: encadrementsCountByYear[year] || 0 // Utiliser 0 si aucune valeur trouvée pour cette année
        }));

        res.json({ 
            encadrementsParAnnee 
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
  };
  
  const pfeParAnnee = async (req, res) => {
    await encadrementsParAnnee(req, res, "PFE");
  };
  const master2ParAnnee = async (req, res) => {
    await encadrementsParAnnee(req, res, "Master2");
  };
  const doctoratParAnnee = async (req, res) => {
    await encadrementsParAnnee(req, res, "Doctorat");
  };















module.exports = { encadrementsParAnneeSansT,master2ParAnnee , pfeParAnnee, doctoratParAnnee }

const Projet = require("../schema/Projet");

/*const projetParAnne = async(req, res) => {
    try {
        let projetTab;
        if (req.body) {
            let {
                dateDebut,
                dateFin
            } = req.body;


            projetTab = await Projet.find({
                DateDebut: {
                    $gt: Number(dateDebut),
                    $lt: Number(dateFin)
                }
            })
        } else {

            projetTab = await Projet.find();
        }

        projetTab.sort((a, b) => Number(a.DateDebut) - Number(b.DateDebut))
        const projetTabHisto = [];

        let projetOfTheYear = [];
        let year = (projetTab.length > 0) ? projetTab[0].DateDebut : 0;

        for (let i = 0; i < projetTab.length; i++) {
            if (projetTab[i].Date == year) projetOfTheYear.push(projetTab[i])
            else {
                projetTabHisto.push({ year, projetOfTheYear });

                year = projetTab[i].DateDebut;
                projetOfTheYear = [projetTab[i]];


            }

        }
        projetTabHisto.push({ year, projetOfTheYear });
        let numberOfProjetOfYear = [];
        for (let i = 0; i < projetTabHisto.length; i++) {
            numberOfProjetOfYear.push({ year: projetTabHisto[i].year, count: projetTabHisto[i].projetOfTheYear.length });
        }


        res.json({ nombreTotalDesProjet: projetTab.length, numberOfProjetOfYear, projet: projetTabHisto })



    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true })
    }



}*/
const projetParAnne = async (req, res) => {
    try {
        const { dateDebut, dateFin } = req.body;

        if (dateDebut.localeCompare(dateFin) === 1) {
            throw new Error("La date de début ne peut pas être superieur à la date de fin.");
        }
        const projets = await Projet.find({
            DateDebut: {
                $gte: Number(dateDebut), // Utilisation de $gte pour inclure également dateDebut
                $lte: Number(dateFin)    // Utilisation de $lte pour inclure également dateFin
            }
        }).sort({ DateDebut: 1 });

        let projetsParAnnee = [];
        let currentYear = Number(dateDebut); // Commence à partir de dateDebut
        let countIndex = 0;

        projets.forEach(projet => {
            const projetYear = projet.DateDebut;

            // Ajoute les années manquantes avec 0 projets
            while (currentYear < projetYear) {
                projetsParAnnee.push({ year: currentYear, count: 0 });
                currentYear++;
            }

            // Ajoute l'année avec le nombre de projets
            projetsParAnnee.push({ year: projetYear, count: ++countIndex });
            currentYear++;
        });

        // Ajoute les années restantes avec 0 projets jusqu'à dateFin
        while (currentYear <= Number(dateFin)) {
            projetsParAnnee.push({ year: currentYear, count: 0 });
            currentYear++;
        }
        projetsParAnnee = projetsParAnnee.map(item => ({ year: parseInt(item.year), count: item.count }));
        res.json({ 
            
            projetsParAnnee 
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });
    }
};

module.exports = { projetParAnne }

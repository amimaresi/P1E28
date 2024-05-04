const Projet = require("../shcema/Projet");

const projetParAnne = async(req, res) => {
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



}
module.exports = { projetParAnne }
const Encadrement = require("../schema/Encadrement");
const nombreEncadrement = async(req, res) => {

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
            },
          
        }).filter((e) => e.Type == "PFE");



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



}













module.exports = { nombreEncadrement, pfeParAnnee, doctoratParAnnee }
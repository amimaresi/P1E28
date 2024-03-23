const Projet = require("../../schema/Projet");
const projet_recherche = (req, res) => {
    const option = {};
    if (req.query.num) {
        option._id = req.query.num;
    }
    if (req.query.Titre) {
        const regexPatternTitre = new RegExp(req.query.Titre, 'i');
        option.Titre = regexPattern;

    }
    if (req.query.Theme) {
        const regexPatternTheme = new RegExp(req.query.Theme, 'i');
        option.Theme = regexPatternTheme;

    }
    if (req.query.ChefDeProjet) {
        option.ChefDeProjet = req.query.ChefDeProjet;
    }

    Projet.find(option).then((result) => {
        res.status(200).json({ err: false, Projects: result })

    }).catch((err) => {
        console.log(err);
        res.status(400).json({ err: true })
    })





}
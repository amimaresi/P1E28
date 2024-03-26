const Projet = require("../../schema/Projet");
const projet_recherche = (req, res) => {
    const option = {};
    if (req.query.Num) {
        option._id = req.query.Num;
    }
    if (req.query.Titre) {
        const regexPatternTitre = new RegExp('^' + req.query.Titre, 'i');
        option.Titre = regexPatternTitre;

    }
    if (req.query.Theme) {
        const regexPatternTheme = new RegExp('^' + req.query.Theme, 'im');
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
const projet_by_id = async(req, res) => {
    try {
        const id = req.params.id;
        const projet = await Projet.findById(id);
        if (projet) {
            return res.status(200).json({ error: false, projet })
        }
        return res.status(404).json({ error: false, projet: {} })





    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true })
    }
}
module.exports = { projet_recherche, projet_by_id };
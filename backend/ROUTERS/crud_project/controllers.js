const Chercheur = require('../../schema/Chercheur');
const User = require('../../schema/User');

const Projet = require('../../schema/Projet');

const nouveau_projet = async(req, res) => {
    try {

        let { Num, Titre, DateDebut, DateFin, chefProjet, liste_members, Theme } = req.body;
        if (!Num || !Titre || !DateDebut || !DateFin || !chefProjet || !liste_members || !Theme) throw new Error("tout les champs sont obligatoires");
        //handling chefProjet Id;
        await Projet.findById(Num).then((result) => {
            if (result) return res.status(500).json({ message: "le projet existe déjà", error: true });
        })
        const chef = await Chercheur.findById(chefProjet)

        if (!chef) return res.status(404).json({ message: "le chef de projet n'existe pas"});
        // handling  list members ids
        liste_members = liste_members.split(" ");
        const members = [];
        for (let i = 0; i < liste_members.length; i++) {
            const chercheur = await Chercheur.findById(liste_members[i]);


            if (!chercheur) return res.status(404).json({
                message : "un membre n'existe pas",
                 error: true })
            members.push(liste_members[i]);

        }

        // creating new project
        const projet = new Projet({
            _id: Num,
            Titre,
            DateDebut,
            DateFin,
            liste_members: members,
            Theme,
            ChefDeProjet: chef
        });

         projet.save().then((result) => {
            console.log(result);
         })
        res.status(201).json({
            message: "projet ajouté avec succés",
            error: false
        })





    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "une erreur s'est produite lors de l'ajout du projet",
            error: true });

    }
}
module.exports = { nouveau_projet };
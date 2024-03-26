const Chercheur = require('../../schema/Chercheur');
const User = require('../../schema/User');

const Projet = require('../../schema/Projet');

const nouveau_projet = async(req, res) => {
    try {

        let { Num, Titre, DateDebut, DateFin, chefProjet, liste_members, Theme } = req.body;
        //handling chefProjet Id;
        const chef = await Chercheur.findById(chefProjet)

        if (!chef) return res.status(404).json({ error: true });
        // handling  list members ids
        liste_members = liste_members.split(" ");
        const members = [];
        for (let i = 0; i < liste_members.length; i++) {
            const chercheur = await Chercheur.findById(liste_members[i]);


            if (!chercheur) return res.status(404).json({ error: true })
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

        await projet.save();
        res.status(201).json({
            error: false
        })





    } catch (err) {
        console.log(err);
        res.status(404).json({ error: true });

    }
}
module.exports = { nouveau_projet };
const User = require('../../schema/User');
const Projet = require('../../schema/Projet');

const nouveau_projet = async(req, res) => {
    try {

        const { Num, Titre, DateDebut, DateFin, chefProjet, liste_membre, Description, Theme } = req.body;
        //handling chefProjet Id;
        const chef = await User.findOne({ username: chefProjet });
        if (!chef) return res.status(404).json({ error: true });
        // handling  list members ids
        list_membre = liste_membre.split(" ");
        const members = [];
        for (let i = 0; i < list_membre.length; i++) {
            const user = await User.findOne({ username: list_membre[i] })

            if (!user) return res.status(404).json({ error: true })
            members.push(user._id);
        }
        // creating new project
        const projet = new Projet({
            Num,
            Titre,
            DateDebut,
            DateFin,
            liste_membre: members,
            Description,
            Theme,
            chefProjet: chef
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
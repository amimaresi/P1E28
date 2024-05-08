const mongoose = require('mongoose')

const User = require("../../schema/User");


const rechercherUserParId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).exec();
        console.log(user)
        if (user) {
            res.status(200).json({ error: false, User: user });
        } else {
            res.status(404).json({ error: true, message: "Aucun user trouvée avec cet ID." });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: true, message: "Erreur lors de la recherche de user par ID." });
    }
};

module.exports = rechercherUserParId;

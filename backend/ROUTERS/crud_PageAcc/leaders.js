const mongoose = require('mongoose')
const User = require("../../schema/User")
const Chercheur = require("../../schema/Chercheur")

const getChercheursInfos = async (req, res) => {
    try {
     /* // Récupérer les IDs des "Directeurs" et "Assistants"
      const users = await User.find({ type: { $in: ['Directeur', 'Assistant'] } }, 'id').sort({ type: 1 });
  console.log("user",users)
      // Extraire les IDs
      const chercheursIds = users.map(user => user.id);
  console.log("idCherch",chercheursIds)
      // Récupérer les informations des chercheurs en fonction des IDs
      const chercheursInfos = await Chercheur.find({ _id: { $in: chercheursIds } });
  console.log("resu", chercheursInfos)
      // Envoyer la réponse
      res.json(chercheursInfos);*/
      const directeur = await User.findOne({ type: 'Directeur' }, 'id');

    // Récupérer les IDs des "Assistants"
    const assistants = await User.find({ type: 'Assistant' }, 'id');

    // Créer un tableau contenant les IDs des chercheurs dans l'ordre souhaité
    const chercheursIds = [directeur.id, ...assistants.map(assistant => assistant.id)];

    // Récupérer les informations des chercheurs en fonction des IDs
    let chercheursInfos = await Chercheur.find({ _id: { $in: chercheursIds } });

    // Réorganiser les chercheurs dans l'ordre souhaité
    chercheursInfos = chercheursIds.map(id => chercheursInfos.find(chercheur => String(chercheur._id) === String(id)));

    // Envoyer la réponse
    res.json(chercheursInfos);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations des chercheurs :", error);
      res.status(500).json({ message: "Erreur lors de la récupération des informations des chercheurs" });
    }
  };

  module.exports = getChercheursInfos

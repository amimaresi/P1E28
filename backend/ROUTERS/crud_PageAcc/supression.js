const mongoose = require('mongoose')

const InfoPageAcc = require('../../schema/InfoPageAccueil')


const supprimer = async (req, res) => {
    const { id } = req.params; // Supposons que l'ID de la page  soit passé en tant que paramètre de requête
  
    try {
      // Trouver et supprimer le document par son ID
      const result = await InfoPageAcc.deleteOne({ _id: id });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'La page a été supprimée avec succès.' });
      } else {
        res.status(404).json({ message: 'La page n\'a pas été trouvée.' });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du la page :", error);
      res.status(500).json({ message: 'Erreur lors de la suppression du la page.' });
    }
  };
  
  module.exports =  supprimer ;

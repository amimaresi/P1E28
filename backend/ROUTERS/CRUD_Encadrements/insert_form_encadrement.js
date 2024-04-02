const mongoose = require('mongoose');
const Encadrement = require('../../schema/Encadrement');  //la collection "encadrements"
const enc = require('../../schema/Chercheur');  //la colleection "chercheurs"


const insererEncadrement = async (req, res) => {
    try {
        const data = req.body; 

        const encadrants = data.encadrants.map(encadrant => ({
            nomComplet: encadrant.nomComplet,
            _id: encadrant.idCherch,
            role: encadrant.role
        }));

        const cadr = [];
        for (let i = 0; i < encadrants.length; i++) {
            const ch1 = await enc.findById(encadrants[i]._id);
            if (!ch1) {   //vérifier si le chercheur est interne ou externe
                cadr[i] = {
                    nomComplet: encadrants[i].nomComplet,
                    _id: "",
                    role: ""
                };
            } else {
                cadr[i] = encadrants[i];
            }
        }

        const nouveauEncadrement = new Encadrement({
            Type: data.type,
            Titre: data.titre,
            AnneeD: data.anneeD,
            AnneeF: data.anneeF,
            Encadrants: cadr,
            Etudiants: data.etudiants
        });

        const resultat = await nouveauEncadrement.save();
        res.status(200).json({ success: true, message: 'Encadrement inséré avec succès', data: resultat });
    } catch (erreur) {
        res.status(400).json({ success: false, message: 'Erreur lors de l\'insertion', error: erreur });
    }
};

module.exports = insererEncadrement;


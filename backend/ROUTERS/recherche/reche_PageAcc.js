const mongoose = require('mongoose')

const InfoPageAcc = require("../../schema/InfoPageAccueil");


const rechercherPageAccParId = async (req, res) => {
    try {
        const id = req.params.id;
        const info = await InfoPageAcc.findById(id).exec();
        console.log(info)
        if (info) {
            res.status(200).json({ error: false, InfoPageAcc: info });
        } else {
            res.status(404).json({ error: true, message: "Aucunne page  trouvée avec cet ID." });
        } 
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: true, message: "Erreur lors de la recherche de page par ID." });
    }
};

const TousPages = async(req,res) => {
    try {
        const docs = await InfoPageAcc.find().exec() 
        console.log(docs)
        res.status(200).json({Pages: docs})
    } catch(err) {
        console.log(err)
        res.status(400).json({message: "Erreur"})
    }
}

module.exports = {rechercherPageAccParId,TousPages};

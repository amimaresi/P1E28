const mongoose = require('mongoose')

const InfoPageAcc = require('../../schema/InfoPageAccueil')

const insererDoc = async (req,res) => {
    const {id,title,paragraphe,img,Subject} = req.body
try {
    if(!id || !title || !paragraphe || !Subject ){
        throw new Error("Tous les champs sont obligatoires")
    }

    const infPage = new InfoPageAcc({
        _id: id,
        title,
        paragraphe,
        img,
        Subject
    })
    await  infPage.save()

    return res.status(200).json({ message : "insertion avec succes"})
} catch (error) {
    return res.status(500).json({ message: error.message})
}
}

module.exports = insererDoc

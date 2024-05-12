
const updateHindex = require('./upDateHindex')
const Chercheur = require('../schema/Chercheur')
const updateImageLienGoogle = require('./getImage')

const upDataCherchH = async (req, res) => {

    try {

        const chercheur = await Chercheur.find({})
      //  console.log(chercheur)
       
        for (let i = 0; i < chercheur.length; i++) {
            console.log(chercheur[i].nomComplet + " hindex : ")
            const hindex = await updateHindex(chercheur[i].nomComplet)
            console.log(hindex)
            await Chercheur.updateOne({ _id: chercheur[i]._id }, { H_index: hindex })

            
        }
        res.status(200).json({ message: "H-index mis à jour" })
          

}  
catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}


const chercheurImageGoogleScholar = async (req, res)=>{


    try{

        const chercheur = await Chercheur.find({})
    for (let i = 0; i < chercheur.length; i++) {
        console.log(chercheur[i].nomComplet + " image path : ")
        const {image_path  , GoogleScholar}= await updateImageLienGoogle(chercheur[i].nomComplet)
        console.log(image_path +"google scholar"+ GoogleScholar)
        await Chercheur.updateOne({ _id: chercheur[i]._id }, { image_path: image_path ,
            'lien.GoogleScholar' : GoogleScholar 
        })

        
    }
    res.status(200).json({ message: "updated" })
      

}  
catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message })
}

}



module.exports = {upDataCherchH , chercheurImageGoogleScholar}
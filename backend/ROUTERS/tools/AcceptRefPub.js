
const publication = require('../../../models/publication')
const FiledattentePublications = require('../../../models/fileDattentePublication')
const fileDattentePublication = require('../../../schema/fileDattentePublication')

//in this function we accept the publication and delete it from the waiting list
const acceptPublication = async(req, res)=>{
    (req,res)=>{
        const { Date , Cherch ,confJourn , volume , pages, rang, Titre, Lien, Membres, Classement } = req.body
        const pub = new publication({
            _id:{
                Cherch,
                rang ,
                pages,
                volume ,
                Date ,
                
                confJourn 
            },
            Titre ,
            Lien ,
            Membres ,
            Classement
        })
        fileDattentePublication.findOneAndDelete({ '_id.Cherch': Cherch, '_id.rang': rang, '_id.pages': pages, '_id.volume': volume, '_id.Date': Date, '_id.confJourn': confJourn });
        pub.save().then(()=>{
            res.status(200).json({message:'Publication accepter'})
        }).catch((err)=>{
            res.status(500).json({error:err.message})
        })
    }
}

//in this function we delete the publication from the waiting list if the director refuse it
const refusePublication = async(req, res)=>{
    const { Date , Cherch ,confJourn , volume , pages, rang, Titre, Lien, Membres, Classement } = req.body
    fileDattentePublication.findOneAndDelete({ '_id.Cherch': Cherch, '_id.rang': rang, '_id.pages': pages, '_id.volume': volume, '_id.Date': Date, '_id.confJourn': confJourn }).then(()=>{
        res.status(200).json({message:'Publication refuse'})
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
  
}

module.exports = {acceptPublication, refusePublication}
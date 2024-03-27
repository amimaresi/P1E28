
const FiledattentePublications = require('../../../schema/fileDattentePublication')
const confJournal = require('../../../schema/ConfJournal')

const insertionPublication = async (req, res ) => {

    const { Date , Cherch ,confJourn , volume , pages, rang, Titre, Lien, Membres, Classement } = req.body
   // const Cherch = req.params.id 
    try{
      //const  pub = await FiledattentePublications.findOne({Cherch , rang , pages , volume ,Date , confJourn  })
      const pub = await FiledattentePublications.findOne({ '_id.Cherch': Cherch, '_id.rang': rang, '_id.pages': pages, '_id.volume': volume, '_id.Date': Date, '_id.confJourn': confJourn });
       
      if (pub){

        //envoyer un message d'erreur si la publication existe deja
        throw Error("Publication deja exister")
      }
      else{

        //recuperer le nom de la conference ou du journal
        const conf = await confJournal.findone({'nom':confJourn})

       const publication = new FiledattentePublications({
        _id:{
            Cherch,
            rang ,
            pages,
            volume ,
            Date ,
            confJourn : conf._id //recuperer l'id de la conference ou du journal
        },
        Titre ,
        Lien ,
        Membres ,
        Classement
    })
    //enregistrer la publication dans la base de donnees en attendant la validation par le directeur
    await publication.save()
    
    //envoyer un message de succes avec un code 200 si la publication a ete enregistree avec succes
    res.status(200).json({message:'Votre demande a ete envoye avec succes'})
    
     }

    }
    catch(err){

      //envoyer un message d'erreur avec un code 500 si une erreur s'est produite
        res.status(500).json({error : err.message})
    }



}

module.exports = insertionPublication
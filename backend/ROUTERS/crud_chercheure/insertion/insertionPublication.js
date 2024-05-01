
const FiledattentePublications = require('../../../schema/fileDattentePublication')
const publication = require('../../../schema/Publication')
const confJournal = require('../../../schema/ConfJournal')

const insertionPublication = async (req, res ) => {

    const { Date , Chercheur ,confJourn , volume , pages, rang, Titre, Lien, Membres, Classement } = req.body
    if (!Date || !Chercheur || !confJourn || !volume || !pages || !rang || !Titre || !Lien || !Membres || !Classement){
      throw new Error("Veuillez remplir tous les champs");
    }
    if(Chercheur){
      const Cherch = Chercheur
    }
    else{
      const Cherch = req.params.id
    }

    try{
      //const  pub = await FiledattentePublications.findOne({Cherch , rang , pages , volume ,Date , confJourn  })
      const pub = await FiledattentePublications.findOne({ '_id.Cherch': Cherch, '_id.rang': rang, '_id.pages': pages, '_id.volume': volume, '_id.Date': Date, '_id.confJourn': confJourn })
      const pub2 = await publication.findOne({ '_id.Cherch': Cherch, '_id.rang': rang, '_id.pages': pages, '_id.volume': volume, '_id.Date': Date, '_id.confJourn': confJourn })
       
      if (pub){

        //envoyer un message d'erreur si la publication existe deja
        throw new Error("Cette publication est déjà en attente de validation par le directeur");
      }
      else{

        if(pub2){
            
            //envoyer un message d'erreur si la publication existe deja
            throw new Error("Cette publication a déjà existé");
        }

        else{

        //recuperer le nom de la conference ou du journal
        const conf = await confJournal.findone({'nom':confJourn})

       const publication = new FiledattentePublications({
        
            Cherch,
            rang ,
            pages,
            volume ,
            Date ,
            confJourn : conf._id ,//recuperer l'id de la conference ou du journal
           Titre ,
           Lien ,
           Membres ,
          Classement
    })
    //enregistrer la publication dans la base de donnees en attendant la validation par le directeur
    await publication.save()
    
    //envoyer un message de succes avec un code 200 si la publication a ete enregistree avec succes
    res.status(200).json({message:'Votre demande a été ajouter avec succès'});
    
     }
    }

    }
    catch(err){

      //envoyer un message d'erreur avec un code 500 si une erreur s'est produite
        res.status(500).json({error : err.message})
    }



}

module.exports = insertionPublication
const nodemailer = require('nodemailer')

//cette fonction permet d'envoyer un email a un chercheur pour lui souhaiter la bienvenue
//dans la famille LMCS
//et lui demander de changer son mot de passe
//pour plus de securite et permettre l'acces a son compte

const sendMailCherch = async (email ,  nomComplet ,token) => {
    console.log(nomComplet)
    console.log(email)
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject:'BIENVENUE CHEZ LMCS',
       // text:`Bienvenue monsieur ${nomComplet} dans la famille LMCS`,
        html :
        `<h2>Bienvenue monsieur ${nomComplet} dans la famille LMCS</h2>
        <p>Vous pouvez connecter a votre compte apres changer votre mot de pass</p>
        <a href= http://localhost:5173/login/resetpassword/${token}>cliquez ici pour change votre mot de passe </a>
        <p>Pour plus d'information veuillez nous contacter</p>
        `



    }

    transporter.sendMail(mailOptions ,(err , info)=>{
        if(err){
            console.log('erreur:',err)
        }
        else{
            console.log('email sent :',info.response)
        }
    })


}



module.exports = sendMailCherch 

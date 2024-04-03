const User = require('../schema/User')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')


const resetUserName = async (req ,res)=>{
    const {username} = req.body 
    try {
        const payload = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
        const email = payload.email
      
        await User.findOne({username}).then( async (user)=>{
            if(user){
               
                res.status(401).json({message: "Nom d'utilisateur existe déjà"})
            }
            else{
                
                await User.findOneAndUpdate({_id: email}, {username})
                res.status(200).json({message:"Votre nom d'utilisateur a été réinitialisé avec succès"})

            }
        })

    }catch(err){
        console.log(err)
        res.status(401).json({message : err.message})
    }


}

const resetPassword = async (req , res)=>{

    //get the password from the request body
    const {password} = req.body
  
    console.log(password)

    
   

    try {

         //verify the token
      const payload =  jwt.verify(req.cookies.jwt , process.env.SECRET_KEY )
      
        
       

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)


        //update the user password
        await User.findByIdAndUpdate({_id: payload.email} , {password :hashedPassword})

        /
        //send a message to the client that the password has been reset
        res.status(200).json({message: "Votre mot de pass a ete changer avec succes"})

     



 }
 catch(err){
    //catch any error that occurs during the reset password process
     res.status(400).json({message: err.message})

     // 400 is a status code for bad request 
 }

}








module.exports = {resetUserName , resetPassword }
const User = require('../schema/User')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')
const multer = require('multer')
const chercheur = require('../schema/Chercheur')
const path = require('path')


const  cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_CLOUD_KEY, 
  api_secret: process.env.API_CLOUD_SECRET 
})





const resetUserName = async (req ,res)=>{
    const {username} = req.body 
    try {
        const payload =  jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
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



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profile',
      format: async (req, file) => file.mimetype.split('/')[1], 
      public_id: (req, file) => (
         file.originalname.split('.')[0].replace(/\s/g, '') +  Date.now()),
    },
  })
  const upload = multer({ storage: storage })
const updateProfileImage = async (req , res)=>{

    
   try {
    const payload = jwt.verify(req.cookies.jwt , process.env.SECRET_KEY)
    const email = payload.email 
    console.log(email)
     const user = await chercheur.findOne({_id: email})
     if(user.image_path){
        const img = path.basename(user.image_path)
        console.log(img.split('.')[0])
   const res= await cloudinary.uploader.destroy(`profile/${img.split('.')[0]}`)
   console.log(res)

     }
     await user.updateOne({image_path: req.file.path})
    console.log(req.file.path)
     
    console.log(req.file)
    res.status(200).json({file : 'VOTRE PHOTO DE PROFIL A ETE MODIFIEE AVEC SUCCES'})
   }
    catch(err){
         res.status(400).json({message: err.message})
    }
}









module.exports = {resetUserName , resetPassword , updateProfileImage , upload}
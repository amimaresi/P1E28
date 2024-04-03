//import module bcrypt
const bcrypt = require('bcrypt')

//generating password
const generPassword =  async()=>{
    //generating random password
    const password = Math.random().toString(36)
    const salt = await bcrypt.genSalt(10)
   const hashpassword = await bcrypt.hash(password, salt)

   return hashpassword
    

}
//cette fonction permet de generer un mot de passe aleatoire pour un chercheur 
//et le crypter pour le stocker dans la base de donnees


module.exports = generPassword
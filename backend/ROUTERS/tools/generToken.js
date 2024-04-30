const jwt = require('jsonwebtoken')


const creatToken=(payload)=>{
    console.log("payload:"+payload)
    return jwt.sign({email : payload},process.env.SECRET_KEY,{expiresIn:'1d'})

}

module.exports = creatToken 
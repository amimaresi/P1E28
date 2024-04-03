const jwt = require('jsonwebtoken')


const creatToken=({_id})=>{
    return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'1d'})

}

module.exports = creatToken 
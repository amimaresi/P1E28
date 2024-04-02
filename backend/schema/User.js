const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt');

const UserSchema = new Schema({

    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        //required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "chercheur"
    }
}, { timestamps: true });

UserSchema.statics.login = async function ({usernameEmail , password})
{
    if (!usernameEmail|| !password)
    {
       throw new Error("Veuillez remplir tous les champs")
    }
    if(usernameEmail.includes("@"))
    {
        const user = await this.findOne({ _id: usernameEmail });
        if (user) {
            if (bycrypt.compare(password, user.password)) {
                return user;
            }
            else{
                throw new Error("Mot de passe incorrect")
            }
           
            }
    else{
        throw new Error("Email incorrect")
    }

 }
    else{
        const user = await this.findOne({ username: usernameEmail });
        if (user) {
            if (bycrypt.compare(password, user.password)) {
                return user;
            }
            else{
                throw new Error("Mot de passe incorrect")
            }
           
    }
    else{
        throw new Error("Nom d'utilisateur incorrect")
    
    }
}

}
const User = mongoose.model("user", UserSchema);
module.exports = User 
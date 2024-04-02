const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../../schema/User')

passport.serializeUser((user, done) => {
    console.log('user.id', user.id)
    done(null , user.id)

})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })

})



passport.use(
    new GoogleStrategy({
        // options for the google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'auth/google/redirect'
        
        
    },

    // passport callback function
    (accessToken , refreshToken , profile ,email, done )=>{
        
     User.findOne({_id: email.emails[0].value}).then((currentUser)=>{
        if(currentUser){
            console.log('user is:', currentUser)
            done(null, currentUser)


        }
        else{
         done(new Error('Vous etes connecté avec un compte non autorisé'))

        }
    }
        )
       

    })
)
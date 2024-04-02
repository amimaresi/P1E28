const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie-parser');
require('dotenv').config();
const cors = require('cors')
const app = express();
const crud = require("./ROUTERS/crud_project/routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());

//app.use('/api/v1/home', crud);

app.use(cors())
app.use(express.json())

app.use(express.static('public'))

//socket.io
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)

const io = socketIo(server)



////////////////////////////////////////////////////////////////////////////
const session = require('express-session');

app.use(session({
  secret: 'DDFDG',
  resave: false,
  saveUninitialized: true
}))



const passportSetup = require('./authentication/config/passport-setup')
const passport = require('passport')
app.use('/google', passport.authenticate('google', {
 scope: ['profile',['email']]
}))

app.use('/auth/google/redirect',passport.authenticate('google',
{
 failureRedirect: '/login',
successRedirect:'/'
 }
),(req, res) => {
    res.send('you reached the redirect URI')}
)
app.use(passport.initialize());
app.use(passport.session());
////////////////////////////////////////////////////////////////////////////



const PORT = process.env.PORT || 3000

mongoose.connect(process.env.URL).then(() => {
    server.listen(PORT, () => {
        console.log("connected to the database and start listening at post 3000..")
    })

}).catch((err) => {
    console.log("can't connect ", err)
})
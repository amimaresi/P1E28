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
const insertionChercheur = require('./ROUTERS/crud_project/insertion/insertionChercheur')
const insertionPublication = require('./ROUTERS/crud_project/insertion/insertionPublication')
app.use(express.json())

app.use(express.static('public'))

//socket.io
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)

const io = socketIo(server)

const publication = require('./schema/Publication')
const FiledattentePublications = require('./schema/fileDattentePublication')
app.get('/directeur/alldemandes', (req, res) => {

    console.log('all demandes',req.body)
    FiledattentePublications.find().then((pub) => {
        console.log('all demandes')
        res.status(200).json(pub)
    }).catch((err) => {
        res.status(500).json({ error: err.message })
    })
})

app.post('/accept',(req,res)=>{
    const { Date , Cherch ,confJourn , volume , pages, rang, Titre, Lien, Membres, Classement } = req.body
    const pub = new publication({
        _id:{
            Cherch,
            rang ,
            pages,
            volume ,
            Date ,
            
            confJourn 
        },
        Titre ,
        Lien ,
        Membres ,
        Classement
    })
    pub.save().then(()=>{
        res.status(200).json({message:'Publication accepter'})
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
})



app.post('/postPublication',insertionPublication)



mongoose.connect(process.env.URL).then(() => {
    server.listen(3000, () => {
        console.log("connected to the database and start listening at post 3000..")
    })

}).catch((err) => {
    console.log("can't connect ", err)
})
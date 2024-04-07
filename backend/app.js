const express = require('express')
const mongoose = require('mongoose')
const cookie = require('cookie-parser');
require('dotenv').config();
const cors = require('cors')
const app = express();
const crud = require("./ROUTERS/crud_project/routes");
const cron = require("node-cron");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());
const { get_maj_time } = require('./settings/changeTimeOfMaj');
const { maj } = require("./màj/majM");//pour la maj


app.use(cors())
app.use(express.json())

app.use(express.static('public'))

//socket.io
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)
const io = socketIo(server)
// const authRouter = require('./authentication/router/userRouter')
// const setRouter = require('./settings/router')
app.use('/api/v1/home', crud);
// app.use('/auth', authRouter)
// app.use('/settings' , setRouter)



const PORT = process.env.PORT || 3000

mongoose.connect(process.env.URL).then(() => {
    app.listen(PORT, async () => {
        console.log("connected to the database and start listening at post 3000..")
        let maj_time = await get_maj_time();

        if (maj_time !== -1) {
            maj_time = maj_time[0] * 12 + maj_time[1];
            cron.schedule(`* * * * */${maj_time}`, maj)

        }
    })

}).catch((err) => {
    console.log("can't connect ", err)
})
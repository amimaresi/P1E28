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






const setRouter = require('./settings/router')
const authRouter = require('./authentication/router/userRouter')
app.use('/auth', authRouter)

app.use('/settings' , setRouter)




const PORT = process.env.PORT || 3000



mongoose.connect(process.env.URL).then(() => {
    app.listen(PORT, async () => {
        console.log("connected to the database and start listening at post 3000..")
        
    })

}).catch((err) => {
    console.log("can't connect ", err)
})


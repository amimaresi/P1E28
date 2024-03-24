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














mongoose.connect(process.env.URL).then(() => {
    app.listen(3000, () => {
        console.log("connected to the database and start listening at post 3000..")
    })

}).catch((err) => {
    console.log("can't connect ", err)
})
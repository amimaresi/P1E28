const express = require('express')
const mongoose = require('mongoose')

const app = express();

const dbURI = "mongodb+srv://jazmine:11112024@cluster0.okfd2cg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI).then((result) => console.log("connected")).catch((err) => console.error(err));

const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const crud = require("./ROUTERS/crud_project/routes");
const cherchRoute = require("./ROUTERS/crud_chercheure/insertion/router")
const cron = require("node-cron");
const routerEnc = require("./ROUTERS/CRUD_Encadrements/routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookie());

const { get_maj_time } = require('./settings/changeTimeOfMaj');
const { maj } = require("./màj/majM");//pour la maj


app.use(express.json())



//app.use(cors())
app.use(cors( {origin:'http://localhost:5173', credentials: true }))



const setRouter = require('./settings/router')
const authRouter = require('./authentication/router/userRouter')
const RechercheRouter = require('./ROUTERS/recherche/router')
app.use('/auth', authRouter)
app.use('/insertions', crud)
app.use('/settings' , setRouter)
app.use('/chercheur', cherchRoute)
app.use('/recherche', RechercheRouter)
app.use('/encadrements',routerEnc)







// const authRouter = require('./authentication/router/userRouter')
// app.use('/auth', authRouter)
// app.use("/insertions", crud);
// app.use("/settings", setRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb+srv://jazmine:11112024@cluster0.okfd2cg.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT, async () => {
      console.log(
        "connected to the database and start listening at post 3000.."
      );
    });
  })
  .catch((err) => {
    console.log("can't connect ", err);
  });

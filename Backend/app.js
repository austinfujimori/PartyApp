const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./helpers/error-handler")

app.use(cors());
app.options("*", cors());

// require("dotenv/config")
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

const api = process.env.API_URL;

//import routers
const partiesRouter = require("./routers/parties");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");
const authJwt = require("./helpers/jwt");

//Middleware
//replace body parser with express.json()
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler)
app.use("/public/uploads", express.static(__dirname + "/public/uploads"))



//Routers
app.use(`${api}/parties`, partiesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("DB connection ready");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});

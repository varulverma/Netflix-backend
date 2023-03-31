const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserHandler = require("./handler/userHandler");
const AuthHandler = require("./handler/authHandler");
const Authentication = require("./middleware/authentication");

app.use(express.json());

let clusterUrl = "netflixbackend.wmevcvk.mongodb.net";
let username = "varulverma";
let password = "varulverma";
let dbName = "netflix";
let dbUrl = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;

mongoose.set("strictQuery", true);

mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connection successfull WOW"))
  .catch((error) =>
    console.log(`Unable to connect to mongoDb bcz of error ${error}`)
  );

app.get("/", function (req, res) {
  res.send("Hello World from Netflix Backend!");
});

app.post("/user", UserHandler.signupHandler);
app.post("/", Authentication.checkIfAuthenticated, function (req, res) {
  res.status(200).send("Your are logged In");
});

app.post("/login", AuthHandler.login);

app.listen(3000, function () {
  console.log("Server started up on Port 3000");
});

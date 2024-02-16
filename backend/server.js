const express = require("express");
const mongoose = require("mongoose"); //this object will allow us to cnnectto the database
require("dotenv").config();

const workoutRoutes = require("./routes/workouts");
//express app
const app = express();

//a middleware that will fire for every request
app.use(express.json()); //to access the data inside a request's body and access it to the req handler

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//react to requests
//routes
app.use("/api/workouts", workoutRoutes); //we will be using the workout routes,and use them on the app
//the path added means that when we a user goes to /api/workouts/ will fire workoutRoutes for path /
//when a user goes to /api/workouts/get/workout will fire workoutRoutes for path /get/workout for example

//connect to db
//we don't want to start listening to request unless we're connected to the db.so inside then,we start listenning
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening to a specific port
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port",process.env.PORT );
    });
  })
  .catch((error) => {
    console.log(error);
  });

const express = require("express");
//bcs we need access to the app

const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require("../controllers/workoutController");

//creates an instance of the router
const router = express.Router();

//get all workouts on /
router.get("/", getWorkouts);

//get a single workout
router.get("/:id", getWorkout);

//post a new workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id",deleteWorkout);

//update a workout
router.patch("/:id", updateWorkout); //before sending a patch request,you should,as for a post request,fill the body with the modifications you want then send

module.exports = router;

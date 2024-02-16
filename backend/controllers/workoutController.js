//create here all logic handlers functions and reference them inside the routers to keep things clean,instead of always writing (req,res...)

//interact with datatbase for data retrieval
const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')
//get all workouts
const getWorkouts=async(req,res)=>{
    const workouts=await Workout.find({}).sort({createdAt:-1 /* -1 for descending order*/ })
    res.status(200).json(workouts)
}


//get a single workout
const getWorkout=async(req,res)=>{
    const {id /*grab the id from the route path */}=req.params

    //id validation
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:"no such workout"})
    }

    const workout=await Workout.findById(id) //pass the id from the route we have to find the workout with same id in the db
    if (!workout) {
        return res.status(404).json({erroe:"no such workout"})
    } 
    res.status(200).json(workout)
    
}

//create a new workout
const createWorkout=async(req,res)=>{
    const{title,load,reps}=req.body

    //detect which field ae empty when we send the post request
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:"please fill all the fields",emptyFields})
    }

    //add a new doc to the workout(s) model collection
    try { //we'll try to create a new workout.remember create() is async that takes a new do we're creating {doc}
        const workout= await Workout.create({title,load,reps})
        res.status(200).json(workout) //sending the workut doc we've created
    } catch (error) {
        res.status(400).json({error:error.message}) //error has a "message" property on it that's why we can use .message
    }
}

//delete a workout
const deleteWorkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:"no such workout"})
    }

    const workout=await Workout.findOneAndDelete({_id:id})
    if (!workout) {
        return res.status(404).json({erroe:"no such workout"})
    }

    res.status(200).json(workout)

}


//update a workout
const updateWorkout=async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:"no such workout"})
    }

    const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if (!workout) {
        return res.status(404).json({erroe:"no such workout"})
    }
    res.status(200).json(workout)

}


module.exports={
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}
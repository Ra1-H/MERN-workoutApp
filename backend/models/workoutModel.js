const mongoose=require('mongoose') //it's mongoose that'll allow us to create schema for data in database in mongoDB

const Schema=mongoose.Schema

const workoutSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    }
},{timestamps:true /*it automatically adds to us when the doc was added*/})


//now we need to add a module based on this schema
//schema defines the structure of a doc but the model applies the schema to a particular model,then we use ths model for interactions4.we use module.export to export the model.this model will be later imported as Workout to interact with the workouts table(it automatically plurialize Workout as "Workouts" cllection)

module.exports=mongoose.model('Workout',workoutSchema)
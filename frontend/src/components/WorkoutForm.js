import React, { useState } from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    //we'll create state for each property of the workout
    const {dispatch}=useWorkoutsContext()

    const[title,setTitle]=useState('');
    const[load,setLoad]=useState('');
    const[reps,setReps]=useState('');


    const[error,setError]=useState(null);
    const[emptyFields,setEmptyFields]=useState([])


    const handleSubmit=async(e)=>{
        //async because it's gonna talk to the API
        //we need to prevent the page from refreshing on submit:
        e.preventDefault()

        //create an object to send as the body of the request
        const workout={title,load,reps}

        //use the API to send a post request
        const response=await fetch('/api/workouts',{
            method: 'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        //bcz when we send a post request and handle it,a json is being returned.so we need to store it inside a variable that we call json here
        const json=await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added',json)
            dispatch({type:"CREATE_WORKOUT",payload:json})
        }
    }
  return (
    //create a form with 3 input fiels
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercize Title:</label>
        <input 
            type='text'
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (in kg):</label>
        <input 
            type='number'
            onChange={(e)=> setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Reps:</label>
        <input 
            type='number'
            onChange={(e)=> setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
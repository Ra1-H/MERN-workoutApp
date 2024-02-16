import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const useWorkoutsContext=()=>{
    //passing the WorkoutsContext onbject to the useContext hook returns the value of this object context ie. value={{state,dispatch}}
    const context=useContext(WorkoutsContext)

    if(!context){
        throw Error ('useWorkoutsContext must be used inside a WorkoutContextProvider')
    }

    return context
}

//and now we are ready to use this context inside of our components
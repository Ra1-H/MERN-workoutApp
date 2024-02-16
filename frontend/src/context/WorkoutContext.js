import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

//the reducer function takes the initial state that needs to be changed and an action in dispatch
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload
      };
    case "CREATE_WORKOUT":
      return {
        //add the single created workout to the array first, then ...state.workouts to aadd the other existging workouts
        workouts: [action.payload, ...state.workouts]
      };
    case "DELETE_WORKOUT":
      return {
        //add the single created workout to the array first, then ...state.workouts to aadd the other existging workouts
        workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
      };

    default:
      return state;
  }
};

//we need the comonents to be able to access this context
//so we need to create a component that wraps the whole app
export const WorkoutsContextProvider = ({ children }) => {
  //useReducer is also a state handler.in addition to specifiying an initial state as useState does,useReducer takes a reducer function
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    //we need to wrap the components that will need access tothe context.i.e the whole app
    //the value we provide to our wrapper can be used by whatever is wrapped inside
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  //this useWorkoutsContext hook will provide us with onject "value" that it provides us with
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(
    () => {
      //fetch the workouts from the backend when home renders
      const fetchWorkouts = async () => {
        const response = await fetch("/api/workouts");
        //pass the json from this response to something we can work with
        const json = await response.json(); //json variable here is an array of objects

        if (response.ok) {
          //if response is oke we gonna update the workouts state
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      };
      fetchWorkouts();
    },
    /*empty array so that useeffect fires once only when component renders*/ []
  );

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";


const WorkoutList = ()=>{
  const{userInfo} =useContext(UserContext);


  if(userInfo[0].workouts == undefined){
    
    return
  }
  return(
    <div>
      <select className="selectContainer">
        <option value={""}>
          pick workout
        </option>
        {userInfo[0].workouts.map((e)=>{
          console.log(e)
          return(
            <option value={e.uid}>
              {e}
            </option>
          )
        })}
      </select>
    </div>

  )
}

export default WorkoutList
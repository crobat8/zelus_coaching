import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";


const WorkoutList = (props)=>{
  const{userInfo} =useContext(UserContext);

  if(userInfo[0].workouts === undefined){
    return
  }
  
  return(
    <div>
      <select className="selectContainer">
        <option value={""}>
          pick workout
        </option>
        {userInfo[0].workouts.map((e)=>{
          
          if(!!props.initValue && props.initValue === e){
            return(
              <option selected value={e}>
                {e}
              </option>
            )
          }
          return(
            <option value={e}>
              {e}
            </option>
          )
        })}
      </select>
    </div>

  )
}

export default WorkoutList
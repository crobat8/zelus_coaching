import React, { useContext } from "react";
import { AthleteContext } from "../context/AthletesContext";
import { UserContext } from "../context/UserContext";

const GroupList = ()=>{

  const{userInfo} =useContext(UserContext);


  return(
    <div>
      <select className="selectContainer">
        <option value={""}>
          event group
        </option>
        {userInfo[0].eventGroups.map((e)=>{
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

export default GroupList
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const GroupList = ()=>{

  const{userInfo} =useContext(UserContext);

  if(!userInfo[0].eventGroups){
    return(
      <div>
      <select className="selectContainer">
        <option value={""}>
          event group
        </option>
      </select>
    </div>
    )
  }

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
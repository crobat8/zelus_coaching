import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

const OutlineList = ()=>{

  const{userInfo} =useContext(UserContext);

  if(!userInfo[0].outlines){
    return(
      <div>
      <select className="selectContainer">
        <option value={""}>
          no outline
        </option>
      </select>
    </div>
    )
  }

  return(
    <div>
      <select className="selectContainer">
        <option value={""}>
          no outline
        </option>
        {userInfo[0].outlines.map((e)=>{
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

export default OutlineList
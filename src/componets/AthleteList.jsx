import React, { useContext } from "react";
import { AthleteContext } from "../context/AthletesContext";

const AthleteList = ()=>{
  const{athletesNames} = useContext(AthleteContext)


  return(
    <div>
      <select className="selectContainer">
        <option value={""}>
          athlete name
        </option>
        {athletesNames.map((e)=>{
          return(
            <option value={e.uid}>
              {e.displayName}
            </option>
          )
        })}
      </select>
    </div>

  )
}

export default AthleteList
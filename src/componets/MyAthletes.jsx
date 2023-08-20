import React, { useContext, useState,useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { AthleteContext } from "../context/AthletesContext";
const MyAthlete = () =>{
  const{userInfo} =useContext(UserContext)
  const{athletesNames} = useContext(AthleteContext)
  const{currentUser} = useContext(AuthContext);
  
  return(
    <div>
      <h1>
        My Athletes
      </h1>
      {athletesNames.map((e,key)=>{
        return(
          <h2 key={key}>
            {e.displayName}
          </h2>
        )
      })}
    </div>
  )
}

export default MyAthlete;
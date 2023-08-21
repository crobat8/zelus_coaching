import React, { useContext, useState,useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { AthleteContext } from "../context/AthletesContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
const MyAthlete = () =>{
  const{userInfo} =useContext(UserContext)
  const{athletesNames} = useContext(AthleteContext)
  const{currentUser} = useContext(AuthContext);
  
  function removeAthlete (x){
    console.log(x)
    const coachRef = doc(db,"users",currentUser.uid)
    updateDoc(coachRef,{
      athletes: arrayRemove(x.uid)
    })

    const athleteRef = doc(db,"users",x.uid);
    updateDoc(athleteRef,{
      coaches: arrayRemove(currentUser.uid),
    })

    alert("sucessfully removed athlete");
  }


  return(
    <div>
      <h1>
        My Athletes
      </h1>
      {athletesNames.map((e,key)=>{
        return(
          <div>
            <h2 key={key}>
              {e.displayName}
            </h2>
            <button onClick={()=>removeAthlete(e)}>
              remove athlete
            </button>
          </div>

        )
      })}
    </div>
  )
}

export default MyAthlete;
import React, { useContext, useEffect, useState } from "react";
import { AthleteContext } from "../context/AthletesContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import AthleteList from "./AthleteList";

const AddGroup = () =>{
  
  const [toAdd,setToAdd] = useState(2);
  const {currentUser} =useContext(AuthContext);
  var [athleteSelection,setAthleteSelection] =useState();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(e)

    var groupSpot = currentUser.uid+"_"+e.target[0].value
    var groupUIDS = []
    for(var i = 1;i<=toAdd;i++){
      groupUIDS.push(e.target[i].value)
    }

    const groupsRef = doc(db,"groups",groupSpot)
    const requestRef = doc(db,"users",currentUser.uid)

    setDoc(groupsRef,{
      groupUIDS
    }).then(()=>{
      updateDoc(requestRef,{
        eventGroup: arrayUnion(e.target[0].value)
      }).then(()=>{
        alert("sucessfully created event group")
      })
    })

  }

  const ListCount = () =>{
    var ret =[]
    for(var x=0;x<toAdd;x++){
      ret.push (<AthleteList/>)
    }
    return ret

  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label for='groupName'>group name</label>
        <input required type="groupName" placeholder="throws" />
        <ListCount/>
        <button className="logButton">save</button>
      </form>
    </div>

  )
}
export default AddGroup;
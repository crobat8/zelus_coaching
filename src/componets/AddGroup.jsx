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

  const handleChangeAdd = (x) =>{
    if((toAdd+x)===0){

    }else{
      setToAdd(toAdd+x);
    }
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(e)
    var lower = e.target[0].value.toLowerCase()
    var groupSpot = currentUser.uid+"_"+lower
    var groupUIDS = []
    for(var i = 1;i<=toAdd;i++){
      if(e.target[i].value===""||groupUIDS.includes(e.target[i].value)){
        
      }else{
        groupUIDS.push(e.target[i].value) 
      }
    }
    
    const groupsRef = doc(db,"groups",groupSpot)
    const requestRef = doc(db,"users",currentUser.uid)

    setDoc(groupsRef,{
      groupID:groupSpot,
      groupUIDS
    }).then(()=>{
      updateDoc(requestRef,{
        eventGroup: arrayUnion(lower)
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
      <h1>
        Add a Group
      </h1>
      <form onSubmit={handleSubmit}>
        <label for='groupName'>group name</label>
        <input required type="groupName" placeholder="throws" />
        <ListCount/>
        <div>
          <button type="button" onClick={()=>handleChangeAdd(1)}>
            add athlete slot
          </button>
          <button type="button" onClick={()=>handleChangeAdd(-1)}>
            remove athlete slot
          </button>
        </div>
        <button className="logButton">save</button>
      </form>

    </div>

  )
}
export default AddGroup;
import React, { useContext, useEffect, useState } from "react";
import { AthleteContext } from "../context/AthletesContext";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import AthleteList from "./AthleteList";
import WorkoutList from "./WorkoutList";
const CreateOutline = () =>{

  const [toAdd,setToAdd] = useState(3);
  const {currentUser} =useContext(AuthContext);
  var [athleteSelection,setAthleteSelection] =useState();

  const handleChangeAdd = (x) =>{
    if((toAdd+x)===0){

    }else{
      setToAdd(toAdd+x);
    }
  }

  const handleWorkoutAdd = async (e) =>{
    e.preventDefault();
    console.log(e.target[0].value)
    var lower = e.target[0].value.toLowerCase()

    const meRef = doc(db,"users",currentUser.uid)

    updateDoc(meRef,{
      workouts: arrayUnion(lower)
    }).then(()=>{
      alert("sucessfully added workout")
    })


  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(e)
    var lower = e.target[0].value.toLowerCase()
    var outlineSpot = currentUser.uid+"_"+lower
    var outlineWorkouts = []
    for(var i = 1;i<=toAdd;i++){
      if(e.target[i].value===""||outlineWorkouts.includes(e.target[i].value)){
        
      }else{
        outlineWorkouts.push(e.target[i].value) 
      }
    }
    
    const groupsRef = doc(db,"outlines",outlineSpot)
    const requestRef = doc(db,"users",currentUser.uid)
    
    setDoc(groupsRef,{
      groupID:outlineSpot,
      outlineWorkouts
    }).then(()=>{
      updateDoc(requestRef,{
        outlines: arrayUnion(lower)
      }).then(()=>{
        alert("sucessfully created event group")
      })
    })

  }

  const ListCount = () =>{
    var ret =[]
    for(var x=0;x<toAdd;x++){
      ret.push (<WorkoutList/>)
    }
    return ret

  }
    
  return(
    <div className="createOutline">
      <div>
        <h1>
          create a practice outline
        </h1>
        <form onSubmit={handleSubmit}>
          <label for='groupName'>name of outline</label>
          <input required type="groupName" placeholder="hammer monday " />
          <ListCount/>
          <div>
            <button type="button" onClick={()=>handleChangeAdd(1)}>
              add workout slot
            </button>
            <button type="button" onClick={()=>handleChangeAdd(-1)}>
              remove workout slot
            </button>
          </div>
          <button className="logButton">save</button>
        </form>
      </div>
      
      <div>
        <h1>
          add a workout type
        </h1>
        <form onSubmit={handleWorkoutAdd}>
          <label for='groupName'>name of workout</label>
          <input required type="groupName" placeholder="14lbs fulls" />
          <button className="logButton">save</button>
        </form>
      </div>



    </div>
  )
}

export default CreateOutline
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import WorkoutList from "./WorkoutList";
const CreateOutline = () =>{

  const [outline,setOutline] = useState([])
  const {currentUser} =useContext(AuthContext);

  const handleWorkoutAdd = async (e) =>{
    e.preventDefault();
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
    var lower = e.target[0].value.toLowerCase()
    var outlineSpot = currentUser.uid+"_"+lower
    var outlineWorkouts = []
    for(var i = 1;i<=outline.length;i++){
      if(e.target[i].value===""||outlineWorkouts.includes(e.target[i].value)){
        
      }else{
        outlineWorkouts.push(e.target[i].value) 
      }
    }
    
    const groupsRef = doc(db,"outlines",outlineSpot)
    const requestRef = doc(db,"users",currentUser.uid)
    
    setDoc(groupsRef,{
      outlineID:outlineSpot,
      outlineWorkouts
    }).then(()=>{
      updateDoc(requestRef,{
        outlines: arrayUnion(lower)
      }).then(()=>{
        alert("sucessfully created event group")
      })
    })

  }

  function handleOutline (e) {
    var temp =outline
    if(e === 1){
      temp.push(<WorkoutList />)
      setOutline([...temp])
    }else if(e === -1){
      temp.pop()
      setOutline([...temp]);
    }

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
          {/* need to fix this to be more like create practice form with the whole adding instead of rebuilding thing */}
          {outline.map((e)=>{
            return (
              <div>
                <label>
                  workout
                </label>
                {e}
              </div>
            )
          })}
          <div>
            <button type="button" onClick={()=>handleOutline(1)}>
              add workout slot
            </button>
            <button type="button" onClick={()=>handleOutline(-1)}>
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
import React, { useContext, useState } from "react";

import AthleteList from "./AthleteList";
import GroupList from "./GroupList";
import { AthleteContext } from "../context/AthletesContext";
import OutlineList from "./OutlineList";
import WorkoutList from "./WorkoutList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
  onSnapshot,
  get,
  arrayUnion
} from "firebase/firestore";
import { db } from "../firebase";

const CreatePractice = () =>{
  const [pickedGroup,setPickedGroup] = useState("")
  const [pickedAthlete,setPickedAthlete] = useState("")
  const [pickedAthleteUID,setPickedAthleteUID] = useState("")
  const [practice,setPractice] = useState([])
  const [date,setDate] = useState()
  const{athletesNames} = useContext(AthleteContext)
  const{currentUser} = useContext(AuthContext);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(pickedGroup == "" && pickedAthlete == ""){
      alert("you need to select either a group or an athlete")
    }else if(pickedGroup == ""){
      console.log("indi")
      console.log(pickedAthleteUID)
    }else if(pickedAthlete == ""){
      console.log("group")
    }

    console.log(e)
    console.log(practice.length)
  }

  function handleGroup(e){
    if(e.target.value == ""){
      setPickedGroup("")
      setPickedAthlete("")
      setPickedAthleteUID("")
      return
    }
    setPickedGroup(e.target.value)
    setPickedAthlete("")
    setPickedAthleteUID("")
  }

  function handleIndie(e){
    if(e.target.value == ""){
      setPickedGroup("")
      setPickedAthlete("")
      setPickedAthleteUID("")
      return
    }
    
    for(var x = 0;x<athletesNames.length;x++){
      if(athletesNames[x].uid == e.target.value){
        setPickedAthlete(athletesNames[x].displayName)
        setPickedAthleteUID(e.target.value)
      }
    }
    setPickedGroup("")
  }
  const handleOutline = async (e) =>{
    setPractice([])
    var temp =[]
    var outlineSpot = currentUser.uid + "_" +e.target.value
    
    const q = query(
      collection(db, "outlines"),
      where("outlineID", "==", outlineSpot)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //temp.push(doc.data())
      doc.data().outlineWorkouts.map((e)=>{
        temp.push(<WorkoutList initValue={e}/>)
        setPractice([...temp])
      })
      
    });
  }

  function handlePractice (e) {
    var temp =practice
    if(e == 1){
      temp.push(<WorkoutList />)
      setPractice([...temp])
    }else if(e == -1){
      temp.pop()
      setPractice([...temp]);
    }

  }
  function handleDate(e){
    setDate(e.target.value)
  }

  return(
    <div>
      <h1>
        Create Practice
      </h1>
      <div>
        <h2>
          pick day of practice
        </h2>
        <form onChange={handleDate}>
          <input type="date"/>
        </form>
        
      </div>
      <div>
        <h2>
          pick athlete or group 
        </h2>
        {!pickedGroup?
        <form onChange={handleIndie}>
          <AthleteList />
        </form>
        :
        ""
        }

        {!pickedAthlete?
        <form onChange={handleGroup}>
          <GroupList/>
        </form>:
        ""
        }
        {/* maybe remove this once submit is set up depending on 
        if its needed once I do css \|/*/}
        <h3>
          {pickedAthlete}
          {pickedGroup}
        </h3>
      </div>
      <div>
        <h2>
          pick an outline or add individual workouts
        </h2>
        <form onChange={(e) =>handleOutline(e)}>
          <label>
            pick a outline to build a practice from
          </label><OutlineList/>
        </form>
        <h2>
          staged workout
        </h2>
            
        <form onSubmit={(e)=>handleSubmit(e)}>
          {practice.map((e)=>{
            return (
              <div>

                <div>
                  <label>
                    title
                  </label>
                  {e}
                </div>

                <div>
                  <label>
                    reps
                  </label>
                  <input type="number">
                  </input>
                </div>

                <div>
                  <label>
                    notes
                  </label>
                  <input>
                  </input>
                </div>

              </div>
            )
          })}
          <div>
            <button type="button" onClick={()=>handlePractice(1)}>
              add workout slot
            </button>
            <button type="button" onClick={()=>handlePractice(-1)}>
              remove workout slot
            </button>
          </div>

          <button className="logButton">submit</button>
        </form>
      </div>
    </div>

  )
}

export default CreatePractice
import React, { useContext, useState } from "react";

import AthleteList from "./AthleteList";
import GroupList from "./GroupList";
import OutlineList from "./OutlineList";
import WorkoutList from "./WorkoutList";

import { 
  AthleteContext
} from "../context/AthletesContext";

import { 
  AuthContext
} from "../context/AuthContext";

import { 
  db
} from "../firebase";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const CreatePractice = () =>{
  const [pickedGroup,setPickedGroup] = useState("")
  const [pickedAthlete,setPickedAthlete] = useState("")
  const [pickedAthleteUID,setPickedAthleteUID] = useState("")
  const [practice,setPractice] = useState([])
  const [date,setDate] = useState("")
  const{athletesNames} = useContext(AthleteContext)
  const{currentUser} = useContext(AuthContext);

  const addToDatabase = async (e,ID) =>{
    const dates = date.split('-');
    dates[1] = convertToMonth(dates[1])
    var year = dates[0]
    var month = dates[1]
    var day = dates[2]
    var practicePath = 'practices.'+year+'.'+month+'.'+day
    await updateDoc(doc(db,"users",ID), {
      [practicePath]:day
    }).then(async () => {
      var practiceID = ID+"_"+date
      var workouts = []
      for(var i = 0;i<practice.length;i++){
        var workout ={
          exercise:e.target[(i*3)].value,
          reps:e.target[(i*3)+1].value,
          notes:e.target[(i*3)+2].value
        }
        workouts.push(workout)
      }
      await setDoc(doc(db,"practices",practiceID), {
        practiceID,
        workouts
      }).then(() => {
        console.log("succesfully sent")
      });
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(date === ""){
      alert("you must select a date")
    }else{
      if(pickedGroup === "" && pickedAthlete === ""){
        alert("you need to select either a group or an athlete")
      }else if(pickedGroup === ""){
        addToDatabase(e,pickedAthleteUID)
        alert("succesfully sent practice")
      }else if(pickedAthlete === ""){
        var groupPath = currentUser.uid+'_'+pickedGroup
        const q = query(
          collection(db, "groups"),
          where("groupID", "==", groupPath)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          doc.data().groupUIDS.map((UID)=>{
            addToDatabase(e,UID)
            return true
          })
        });
      }
    }
  }

  function handleGroup(e){
    if(e.target.value === ""){
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
    if(e.target.value === ""){
      setPickedGroup("")
      setPickedAthlete("")
      setPickedAthleteUID("")
      return
    }
    
    for(var x = 0;x<athletesNames.length;x++){
      if(athletesNames[x].uid === e.target.value){
        setPickedAthlete(athletesNames[x].displayName)
        setPickedAthleteUID(e.target.value)
      }
    }
    setPickedGroup("")
  }
  const handleOutline = async (e) =>{
    var temp = practice
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
        return true
      })
    });
  }

  function handlePractice (e) {
    var temp =practice
    if(e === 1){
      temp.push(<WorkoutList />)
      setPractice([...temp])
    }else if(e === -1){
      temp.pop()
      setPractice([...temp]);
    }else if(e === 0){
      setPractice([]);
    }
  }

  function handleDate(e){
    setDate(e.target.value)
  }

  function convertToMonth(x){
    if(x ==='01'){
      return 'January'
    }else if(x === '02'){
      return 'Febuary'
    }else if(x === '03'){
      return 'March'
    }else if(x === '04'){
      return 'April'
    }else if(x === '05'){
      return 'May'
    }else if(x === '06'){
      return 'June'
    }else if(x === '07'){
      return 'July'
    }else if(x === '08'){
      return 'Augest'
    }else if(x === '09'){
      return 'September'
    }else if(x === '10'){
      return 'October'
    }else if(x === '11'){
      return 'November'
    }else if(x === '12'){
      return 'December'
    }else{
      return x
    }
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
      </div>
      <div>
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
            <button type="button" onClick={()=>handlePractice(0)}>
              reset full practice
            </button>
          </div>
          <button className="logButton">submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePractice
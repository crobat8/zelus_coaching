import React, { useContext, useEffect, useState } from "react";
import { AthleteContext } from "../context/AthletesContext";
import { AuthContext } from "../context/AuthContext";
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import AthleteList from "./AthleteList";

const Group = (props) =>{
  const{athletesNames} = useContext(AthleteContext);
  const{currentUser} = useContext(AuthContext);
  const[groupList,setGroupList]=useState([])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    if(e.target[0].value === ""){
      return
    }
    var groupSpot = currentUser.uid+"_"+props.title
    const groupsRef = doc(db,"groups",groupSpot)
    updateDoc(groupsRef,{
      groupUIDS: arrayUnion(e.target[0].value)
    }).then(()=>{
      alert("sucessfully added athlete to group")
    })
  }

  const handleRemove = async (e) =>{
    e.preventDefault();

    var groupSpot = currentUser.uid+"_"+props.title
    const groupsRef = doc(db,"groups",groupSpot)
    updateDoc(groupsRef,{
      groupUIDS: arrayRemove(e)
    }).then(()=>{
      alert("sucessfully removed athlete")
    })
  }

  function convertUID(x){
    for(var i = 0; i<athletesNames.length; i++){
      if(athletesNames[i].uid === x){
        return athletesNames[i].displayName
      }
    }
    return x
  }

  useEffect(() => {
    var groupSpot = currentUser.uid+"_"+props.title
    console.log(groupSpot)
    const groupRef =query(collection(db,"groups"),where("groupID","==",groupSpot)) 
    const unsub = onSnapshot(groupRef,(snapshot)=>{
      setGroupList(snapshot.docs.map(doc=>doc.data()))
    })
    
    return () => {
      unsub();
    };

  }, [props,currentUser.uid]);

  if(!groupList[0]){
    console.log(groupList)
    return(
      <h1>
        {props.title}
      </h1>
    )
  }else{
    console.log(groupList)
  }

  return(
    <div>
      <h1>
        {props.title}
      </h1>
      <form onSubmit={handleSubmit}>
        <p>
          add an athlete to this event group
        </p>
        <AthleteList/>
        <button>
          add athlete
        </button>
      </form>
      
      {groupList[0].groupUIDS.map((e)=>{
        var tempName = convertUID(e)
        
        return(
          <div>
            <h3>
              {tempName}
            </h3>
            <button onClick={()=>handleRemove(e)}>
              remove athlete
            </button>
          </div>

        )
      })}
    </div>

  )

}

export default Group
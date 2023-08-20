import React, { useContext, useEffect, useState } from "react";
import { AthleteContext } from "../context/AthletesContext";
import { AuthContext } from "../context/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Group = (props) =>{
  const{athletesNames} = useContext(AthleteContext);
  const{currentUser} = useContext(AuthContext);
  const[groupList,setGroupList]=useState([])
  console.log(props.title)

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

  }, [props]);

  function convertUID(x){
    console.log(athletesNames)
    for(var i = 0; i<athletesNames.length; i++){
      if(athletesNames[i].uid === x){
        return athletesNames[i].displayName
      }
    }
    return x
  }

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
      {groupList[0].groupUIDS.map((e)=>{
        var tempName = convertUID(e)
        
        return(
          <h3>
            {tempName}
          </h3>
        )
      })}
    </div>

  )

}

export default Group
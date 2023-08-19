import React, { useContext, useState,useEffect } from "react";
import { UserContext } from "../context/UserContext";
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
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const MyAthlete = () =>{
  const{userInfo} =useContext(UserContext)
  const[athletes,setAthletes] = useState([])
  const{currentUser} = useContext(AuthContext);
  
  const getRequestInfo = async ()=>{
    var temp = []
    if(!currentUser){
      return
    }
    const athleteRef =query(collection(db,"names"),where("uid","in",userInfo[0].athletes)) 
    
    const querySnapshot = await getDocs(athleteRef);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
      setAthletes(temp)
    });

  }


  useEffect(() => {
    if(userInfo[0].athletes.length == 0){

    }else{
      console.log("tests2")
      getRequestInfo();
    }
    

  }, []);

  if(!athletes){
    return(
      <h1>
        you have no athletes go and add some
      </h1>
    )
  }

  return(
    <div>
      <h1>
        My Athletes
      </h1>
      {athletes.map((e)=>{
        console.log(e)
        return(
          <h2>
            {e.displayName}
          </h2>
        )
      })}
    </div>

  )

}

export default MyAthlete;
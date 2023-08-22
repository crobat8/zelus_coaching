import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { UserContext } from "./UserContext";

export const AthleteContext = createContext();

export const AthleteContextProvider = ({ children }) => {
  const [athletesNames,setAthletesNames]=useState([]);
  const {userInfo}= useContext(UserContext);
  
  useEffect(() => {
    
    if(!userInfo||!userInfo[0].athletes){
      return
    }

    const userRef =query(collection(db,"names"),where("uid","in",userInfo[0].athletes)) 
    const unsub = onSnapshot(userRef,(snapshot)=>{
      setAthletesNames(snapshot.docs.map(doc=>doc.data()))
    })
    
    return () => {
      unsub();
    };

  }, [userInfo]);

  if(!athletesNames){
    return(
      <h1>
        loading athletes
      </h1>
    )
  }else{
    
  }
  return (
    <AthleteContext.Provider value={{ athletesNames }}>
      {children}
    </AthleteContext.Provider>
  );
};
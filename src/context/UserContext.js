import { createContext, useEffect, useState,useContext } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { 
  AuthContext 
} from "../context/AuthContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [userInfo,setUserInfo]=useState("")
  
  useEffect(() => {
    
    const userRef =query(collection(db,"users"),where("uid","==","SeVW58sXAMfQG3eN5U2L73I0EmE2")) 
    const unsub = onSnapshot(userRef,(snapshot)=>{
      setUserInfo(snapshot.docs.map(doc=>doc.data()))
    })
    
    return () => {
      unsub();
    };

  }, [currentUser]);

  return (
    <UserContext.Provider value={{ userInfo }}>
      {children}
    </UserContext.Provider>
  );
};
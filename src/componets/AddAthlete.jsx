import React, { 
  useContext, 
  useState 
} from "react";

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

import { 
  db 
} from "../firebase";

import { 
  AuthContext 
} from "../context/AuthContext";

const AddAthlete = () =>{
  const{currentUser} = useContext(AuthContext);
  const [athletes, setAthletes] = useState([]);
  const [err, setErr] = useState(false);
  
  const handleSearch = async (e) => {
    
    var temp = []
    
    const q = query(
      collection(db, "names"),
      where("brokenDisplayName", "array-contains", e.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
      setAthletes(temp)
    });
  };

  function sendRequest(x){
    const requestRef = doc(db,"users",x.uid)
    
    updateDoc(requestRef,{
      requests: arrayUnion(currentUser.uid)
    })
  }

  return(
    <div className="addAthlete">
      <h3>
        search and athletes name
      </h3>
      <input
        type="text"
        placeholder="Find a user"
        onChange={(e) => handleSearch(e.target.value)}
        className="addinput"
      />
        {athletes.map((e,i)=>{
        if(e.uid == currentUser.uid){
          return
        }
        return(
          <div className="add" >
            <div className="userChatInfo">
              {/* profile pic */}
              <span>{e.displayName}</span>
              <button onClick={()=>sendRequest(e)} >
                add user as friend
              </button>  
            </div>
          </div> 
        )
      })}  
    </div>

  )
}

export default  AddAthlete;
import React, { useContext, useState,memo } from 'react';

import RedLogo from '../img/CWU_wildcat_spirit_mark_RGB.png'

import { auth } from '../firebase'
import {signOut} from "firebase/auth"
import { AuthContext } from '../context/AuthContext';
import { 
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineMenu
} from 'react-icons/ai';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const Home = () =>{ 
    
  const [page,setPage] = useState(1);
  const [open,setOpen] = useState(true);
  const{currentUser} = useContext(AuthContext);

  let socialIconStyles = { color: "white", fontSize: "1.5em" ,padding:"5px"};
  let menuIconStyle = { color: "white", fontSize: "1.5em" ,padding:"10px",marginLeft:"0px"};

  function handleOpen(){
    setOpen(!open)
  }

  function HandleSwap(){
    if(page === 1){
      return (
        <h1>
          page 1
        </h1>
      )
    }else if(page === 2){
      return (
        <h1>
          page 2
        </h1>       
      )
    }else if(page === 3){
      return(
        <h1>
          page 3
        </h1>
      ) 
    }else if(page === 4){
      return(
        <h1>
          page 4
        </h1>
      )  
    }else{
      return (
        <h1>
          default page
        </h1>
      )
    }
  }

  return (
    <div className="home" >
      <header className="topBar" >
        <div onClick={()=>handleOpen()} className='iconHolder'>
          <AiOutlineMenu style={menuIconStyle}/>
        </div>
        <div className='space'>

        </div>
        <img src={RedLogo} alt='logo' /> 
      </header>
      <main className="page" >
        <Sidebar
          collapsed={open}
          width='150px'
          collapsedWidth='0px'
        >
          <Menu>
            <SubMenu label="Practice">
              <SubMenu label="September">
                <MenuItem onClick={()=>setPage(1)}> 1st </MenuItem>
                <MenuItem onClick={()=>setPage(2)}> 2nd </MenuItem>
              </SubMenu>
              <MenuItem onClick={()=>setPage(1)}> Practices </MenuItem>
              <MenuItem onClick={()=>setPage(2)}> Lifts </MenuItem>
            </SubMenu>
            <MenuItem onClick={()=>setPage(4)}> Projections </MenuItem>
            <MenuItem onClick={()=>signOut(auth)}> Logout </MenuItem>
          </Menu>
        </Sidebar>
        <HandleSwap/>
      </main>
      <footer className="information" >
        <div className='infoTop'>
          <div className='left'>
            <h3>
              contact info
            </h3>
          </div>
          <div className='middle'>
            <h3>
              social media
            </h3>
            <div>
              <a href="https://www.facebook.com/profile.php?id=100094597923715">
                <AiFillFacebook style={socialIconStyles}/>
              </a>
              <a href="https://www.instagram.com/partyup.social/">
                <AiFillInstagram style={socialIconStyles}/>
              </a>
            </div>
          </div>
          <div className='right'>
            <h3>
              Other
            </h3>
            <button  onClick={()=>alert()}>
              send us a review
            </button>
          </div>
          <div className='infoBot' >
            <span className='copy'>
              &copy; PartyUp
            </span>                 
          </div>
        </div>
      </footer> 
    </div>
  )
}

export default Home;
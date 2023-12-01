import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

import FileUpload from "@cloudscape-design/components/file-upload";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import TextContent from "@cloudscape-design/components/text-content";

import { TbLogout } from "react-icons/tb";


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="user">
        <img className='sidenav-img' src={currentUser.photoURL} alt="" />
        <span className="logo sidenav-logo">{currentUser.displayName}</span>
      </div>

      <div className='user'>
        <TbLogout className="icon logout-icon" onClick={()=>signOut(auth)}/>
      </div>
    </div>
  )
}

export default Navbar
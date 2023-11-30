import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

import FileUpload from "@cloudscape-design/components/file-upload";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextContent from "@cloudscape-design/components/text-content";

import { TbLogout2 } from "react-icons/tb";


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span className="logo">{currentUser.displayName}</span>
      </div>

      <div className='user'>
        {/* <span>Ande Chen</span> */}
        <TbLogout2 className="logout-icon" onClick={()=>signOut(auth)}/>
        {/* <Button variant="primary" onClick={()=>signOut(auth)}>
          logout
        </Button> */}
      </div>
    </div>
  )
}

export default Navbar
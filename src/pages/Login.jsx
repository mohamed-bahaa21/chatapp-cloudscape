import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {signOut} from "firebase/auth"

import FileUpload from "@cloudscape-design/components/file-upload";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextContent from "@cloudscape-design/components/text-content";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profile_image, setProfileImage] = React.useState([]);

  
  // signOut(auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
      <TextContent>
        <h1 className="logo">Andy Chen</h1>
        <span className="title"><strong>Login</strong></span>
      </TextContent>
        
      <form onSubmit={handleSubmit}>
        {/* <input required type="email" placeholder="email" /> */}
        <Input
          type="email"
          inputMode="email"
          onChange={({ detail }) => setEmail(detail.value)}
          value={email}
          ariaRequired
          placeholder="Enter Your Email"
        />

        {/* <input required type="password" placeholder="password" /> */}
        <Input
          onChange={({ detail }) => setPassword(detail.value)}
          value={password}
          ariaRequired
          type="password"
          placeholder="Enter Your Password"
        />
        <button>Sign in</button>
        {err && <span>Something went wrong</span>}
        </form>

        <TextContent>
        <p>
          <small>
            You don't have an account ? <Link to="/register">Register</Link>
          </small>
        </p>
        </TextContent>
      </div>
    </div>
  );
};

export default Login;

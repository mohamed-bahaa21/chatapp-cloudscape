import React, { useState } from "react";

import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import FileUpload from "@cloudscape-design/components/file-upload";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import TextContent from "@cloudscape-design/components/text-content";




const Register = () => {
  // new imp UI
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profile_image, setProfileImage] = React.useState([]);


  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            console.log("here");
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
      <TextContent>
        <h1 className="logo">Andy Chen</h1>
        <span className="title"><strong>Register</strong></span>
      </TextContent>
        <form onSubmit={handleSubmit}>
          {/* <input required type="text" placeholder="display name" /> */}
          <Input
            type="text"
            onChange={({ detail }) => setName(detail.value)}
            value={name}
            ariaRequired
            autoFocus
            placeholder="Enter Your Displayed Name"
          />

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

          {/* <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label> */}
          <FormField label="Profile Image">
            <FileUpload
              type="file" id="file"
              onChange={({ detail }) => setProfileImage(detail.value)}
              value={profile_image}
              i18nStrings={{
                uploadButtonText: e =>
                  e ? "Choose files" : "Choose image",
                dropzoneText: e =>
                  e
                    ? "Drop files to upload"
                    : "Drop file to upload",
                removeFileAriaLabel: e =>
                  `Remove file ${e + 1}`,
                limitShowFewer: "Show fewer files",
                limitShowMore: "Show more files",
                errorIconAriaLabel: "Error"
              }}
              showFileLastModified
              showFileSize
              showFileThumbnail
              tokenLimit={3}
            />
          </FormField>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong </span>}
        </form>

        <TextContent>
        <p>
          <small>
          You do have an account? <Link to="/login">Login</Link>
          </small>
        </p>
        </TextContent>
      </div>
    </div>
  );
};

export default Register;

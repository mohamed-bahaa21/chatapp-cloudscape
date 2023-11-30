import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import {signOut} from "firebase/auth"

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const [activeId, setActiveId] = useState(null);


  const handleSelect = (id, u) => {
    setActiveId(id);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          id={chat[0]}
          className={`userChat ${activeId === chat[0] ? 'userChat-active' : 'userChat-inactive'}`}
          key={chat[0]}
          onClick={() => handleSelect(chat[0], chat[1].userInfo)}
        >
          <div>

          <div class="cs-avatar cs-avatar--md">
            <div class="cs-status cs-status--md cs-status--available">
              <div class="cs-status__bullet">
              </div>
            </div> 
            <img src={chat[1].userInfo.photoURL} alt="" />
          </div>
          
          </div>
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;

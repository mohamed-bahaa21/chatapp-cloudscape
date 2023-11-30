import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import MessagesInput from "./MessagesInput";

import { ChatContext } from "../context/ChatContext";

import Header from "@cloudscape-design/components/header";
import TextContent from "@cloudscape-design/components/text-content";

const Chat = () => {
  const { data } = useContext(ChatContext);

  let chatteeName = data.user?.displayName;
  let chatteeImg = data.user?.photoURL;

  return (
    <div className={` ${chatteeName ? 'chat' : 'block-centered'}`}>
      {chatteeName ? '' : 
      <TextContent>
        <span className="title">Select a user to start a conversation</span>
      </TextContent>
      }
      <div className={`chatInfo `}>
        {chatteeImg ? 
        <div class="cs-avatar cs-avatar--md">
        <div class="cs-status cs-status--md cs-status--available">
          <div class="cs-status__bullet">
          </div>
        </div> 
        <img width={'54px'} height={'54px'} class="sidenav-img chatinfo-img" src={`${chatteeImg}`}  alt="" /> 
      </div>
        : ''}
        <span><strong>{chatteeName}</strong></span>
      </div>
      <Messages />
      {chatteeName ? <MessagesInput/> : ''}
    </div>
  );
};

export default Chat;

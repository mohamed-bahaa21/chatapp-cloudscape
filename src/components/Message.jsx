import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // console.log("Message: ", message);

  function formatTimeAgo(timestamp) {
    const now = new Date();
    const diffMilliseconds = now - timestamp;
  
    const seconds = Math.floor(diffMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (hours < 48) {
      return 'yesterday';
    } else {
      return `${days}d ago`;
    }
  }
  
  // Example usage
  // Assuming timestamp components
  const seconds = message.date.seconds;
  const nanoseconds = message.date.nanoseconds;
  // Combine seconds and nanoseconds into milliseconds
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
  // Create a new Date object
  const date = new Date(milliseconds);
  const timestamp = new Date(date);
  const updatedTimestamp = formatTimeAgo(timestamp);
  // console.log(formatTimeAgo(timestamp));
  // console.log(date);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{updatedTimestamp}</span>
      </div> */}
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

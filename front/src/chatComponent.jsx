import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to your backend server

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [username, setUsername] = useState(
    "User" + Math.floor(Math.random() * 1000)
  ); // Generate a random username

  useEffect(() => {
    // Listener for 'chat' event
    socket.on("chat", (data) => {
      const updatedHistory = [...chatHistory, data];
      setChatHistory([...chatHistory, data]);
      console.log("Updated History:", updatedHistory);
    });
    fetch("http://localhost:3000/chat");
  }, [chatHistory]);

  const sendMessage = () => {
    socket.emit("chat", { username, message }); // Use the random username
    setMessage("");
  };
  console.log("Current UI state:", chatHistory); // Debug line
  return (
    <div>
      <div>
        {chatHistory.map((data, index) => (
          <div key={index}>
            <strong>{data.username}:</strong> {data.message}
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;

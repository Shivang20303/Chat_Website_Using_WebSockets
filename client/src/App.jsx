import React, { useEffect, useState } from "react";
import "./App.css";
import MessageWindow from "./Components/MessageWindow/MessageWindow";
import TextBar from "./Components/TextBar/TextBar";
import { registerOnMessageCallback, send } from "./websocket";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    registerOnMessageCallback(onMessageReceived);
  }, []);

  const onMessageReceived = (msg) => {
    msg = JSON.parse(msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const setUserName = (name) => {
    setUsername(name);
  };

  const sendMessage = (text) => {
    const message = {
      username: username,
      text: text,
    };
    send(JSON.stringify(message));
  };

  if (username === null) {
    return (
      <div className="container">
        <h1 className="container-title">Chat Application</h1>
        <div className="container-subtitle">Enter username</div>
        <TextBar onSend={setUserName} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="container-title">Chat Application</h1>
      <MessageWindow messages={messages} username={username} />
      <TextBar onSend={sendMessage} />
    </div>
  );
};

export default App;

import React from "react";
import "../../assets/css/chatbot.css";
import { useChatbot } from "./Chatbot";

function Chatbot() {
  const { firstName, messages, setMessage, textRef, chat, sendMessage } =
    useChatbot();
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <i className="fas fa-robot"></i>
        <p>Chatbot Support</p>
      </div>
      <div className="chat" ref={chat}>
        <Message
          message={`Hello ${firstName}!👋 I’m your Sagely assistant. How can I help you today?`}
          bot={true}
        />
        {messages.map((message, i) => (
          <Message key={i} message={message.message} bot={message.bot} />
        ))}
      </div>
      <div className="controls">
        <input
          type="text"
          placeholder="Type your message..."
          ref={textRef}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="fas fa-paper-plane" onClick={sendMessage}></button>
      </div>
    </div>
  );
}

function Message({ message, bot }) {
  return (
    <div className={`chat-message ${bot ? "bot" : "human"}`}>
      <p>{message}</p>
    </div>
  );
}

export default Chatbot;

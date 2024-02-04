// ChatScreen.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './style.css';
import axios from 'axios';

const ChatScreen = ({ userEmail }) => {
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    axios.get('http://127.0.0.1:5000/getMessages').then(({ data }) => {
      console.log("daat:", data)
      setMessages(data?.body)
    })

    // Connect to the WebSocket server
    const newSocket = io('http://127.0.0.1:5000');
    setSocket(newSocket);

    // Cleanup socket on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    if (socket) {
      socket.on('receive_message', (message) => {
        console.log("message:",message)
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  //   const handleInputChange = (e) => {
  //     setNewMessage(e.target.value);
  //   };

  const handleSendMessage = () => {
    console.log("newMessage",newMessage)
    if (socket && newMessage.trim() !== '') {
      console.log("newMessage",newMessage)
      const newMessageObj = {
        sender: userEmail,
        text: newMessage,
      };
      socket.emit('message', newMessageObj);
      //   setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-screen">
      <div className="message-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender_email === userEmail ? 'user' : 'other'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;

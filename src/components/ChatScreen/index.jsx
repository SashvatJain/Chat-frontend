// ChatScreen.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './style.css';

const ChatScreen = () => {
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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
      socket.on('message', (message) => {
        console.log("message:",message)
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value);
//   };

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      const newMessageObj = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
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
            className={`message ${message.sender === 'user' ? 'user' : 'other'}`}
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

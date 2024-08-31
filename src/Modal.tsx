import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

export function Modal({ isOpen, setOpen }) {
  const [chatName, setChatName] = useState('');
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
  });

  const handleAddChat = async () => {
    console.log('Chat Name before API call:', chatName);  // Debugging line

    if (true) {
      try {
      
        // Send the request to the API
        const queryResponse = await api.post("/chat/add/", {
          title: chatName,
          created_at: new Date().toISOString(),
          
        }, {
          headers: {
            Authorization: `bearer ${sessionStorage.getItem("token")}`, // Add the token to the request headers
          },
        
        });

        const newChat = queryResponse.data;

        // Clear the input and close the modal
        setChatName('');
        setOpen(false);
      } catch (error) {
        console.error('Error adding chat:', error);
      }
    } else {
      console.log('Chat name cannot be empty');
    }
  };

  return (
    <>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '300px'
          }}>
            <h3>Chat Name</h3>
            <label htmlFor="chatNameInput">Enter Chat Name:</label>
            <input
              type="text"
              id="chatNameInput"
                // Ensure the value is bound to state
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChatName(e.target.value)}  // Update state on input change
              placeholder="Enter chat name"
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '10px',
                marginBottom: '10px',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleAddChat}>Add Chat</button>
              <button onClick={() => setOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

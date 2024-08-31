"use client";
import React, { useState, useEffect } from 'react';
import './index.css';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Modal } from './Modal';
import axios from 'axios';
export function MySideBar({ initialChats, onSelectChat }) {
  const [chats, setChats] = useState(initialChats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected,setSelected]=useState('');
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
  });
  // UseEffect to update chats when initialChats changes
  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);
  const handleChatClick = async (chatId) => {
    try {
      
      const response = await api.get(`/chat/${chatId}`, {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`, // Add the token to the request headers
        },
      });
      const selectedChat = response.data;
      console.log(response);
      onSelectChat(selectedChat);  // Pass the selected chat (with messages) to parent component
    setSelected(selectedChat['title']);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };
  // Function to add chat to the state, passed to the Modal


  return (
    <>
      <Sidebar aria-label="Sidebar with logo branding example">
        <div className="icon-container flex">
          <img
            src="src/assets/plus-square.svg"
            alt="Add Chat"
            className="icon "
            onClick={() => setIsModalOpen(true)}
          />
          <div className='item-end flex'>
          <h1 className='text-2xl font-bold item-end   '>{selected}</h1>
          </div>
        </div>

        <Sidebar.Items>
          <Sidebar.ItemGroup style={{ cursor: 'pointer' }}>
            {chats.map((chat) => (
              <Sidebar.Item key={chat._id} className="chat-item" onClick={()=>handleChatClick(chat._id)}>
                {chat.title}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Pass the addChat function to Modal */}
      <Modal 
        isOpen={isModalOpen} 
        setOpen={setIsModalOpen} 
        
      />
    </>
  );
}

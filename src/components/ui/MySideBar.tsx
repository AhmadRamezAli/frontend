"use client";
import React, { useState, useEffect } from 'react';
import '../../index.css';
import { ScrollArea } from "@/components/ui/scroll-area";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Modal } from './Modal';
import {axiosInstance} from '../../APIs/axiosInstance';
import { getSelectedChat } from '../../APIs/getSelectedChat';
export function MySideBar({ initialChats, onSelectChat }) {
  const [chats, setChats] = useState(initialChats);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected,setSelected]=useState('');
  
  // UseEffect to update chats when initialChats changes
  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);
  const handleChatClick = async (chatId) => {
    try {
      
      const response = await getSelectedChat(chatId);
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
     <ScrollArea className='h-[660px]'>
      <Sidebar aria-label="Sidebar with logo branding example">
        <div className="icon-container flex">
          <img
            src="src/assets/plus-square.svg"
            alt="Add Chat"
            className="icon "
            onClick={() => setIsModalOpen(true)}
          />
          <div className='item-end flex ml-40'>
          <h1 className='text-2xl font-bold '>{selected}</h1>
          </div>
        </div>

        <Sidebar.Items>
          <Sidebar.ItemGroup style={{ cursor: 'pointer' }}>
            {chats.map((chat) => (
              <Sidebar.Item key={chat._id} className="chat-item h-16" onClick={()=>handleChatClick(chat._id)}>
                {chat.title}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      </ScrollArea>
      {/* Pass the addChat function to Modal */}
      <Modal 
        isOpen={isModalOpen} 
        setOpen={setIsModalOpen} 
        
      />
    </>
  );
}

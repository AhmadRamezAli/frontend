"use client";
import React, { useState, useEffect } from 'react';
import './index.css';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Modal } from './Modal';

export function MySideBar({ initialChats, onSelectChat }) {
  const [chats, setChats] = useState(initialChats);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // UseEffect to update chats when initialChats changes
  useEffect(() => {
    setChats(initialChats);
  }, [initialChats]);

  // Function to add chat to the state, passed to the Modal
  const addChat = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  return (
    <>
      <Sidebar aria-label="Sidebar with logo branding example">
        <div className="icon-container">
          <img
            src="src/assets/plus-square.svg"
            alt="Add Chat"
            className="icon"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {chats.map((chat) => (
              <Sidebar.Item key={chat.id} className="chat-item">
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

import {axiosInstance}from './axiosInstance.tsx';



export  async function getSelectedChat(chatId){


    return axiosInstance.get(`/chat/${chatId}`);
}

import {axiosInstance}from './axiosInstance.tsx';



export  async function getAllChats(){


    return await axiosInstance.get("/user/chats");

}

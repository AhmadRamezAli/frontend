import {axiosInstance}from './axiosInstance.tsx';



export  async function addChat(chatName){
 

    return axiosInstance.post("/chat/add/", {
        title: chatName,
        created_at: new Date().toISOString(),
        
      }, {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`, // Add the token to the request headers
        },
      
      });






}
import {axiosInstance}from './axiosInstance.tsx';



export  async function addMessage(chatId,question){
 

    return axiosInstance.post(`/chat/${chatId}/add_message`, {
  
        // Send as an array of strings
        content:question,
        message_type:"request",
        message_time: new Date(),
      
      });


}

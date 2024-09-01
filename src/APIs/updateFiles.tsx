import {axiosInstance}from './axiosInstance.tsx';



export  async function updateFiles(chatId,formData){
 

    return axiosInstance.post(`/chat/${chatId}/updatefile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });





}




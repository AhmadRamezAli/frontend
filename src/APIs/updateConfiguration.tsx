import {axiosInstance}from './axiosInstance.tsx';



export  async function updateConfiguration(chatId,chunks,numOfResults,selectedModel){


    return axiosInstance.post(`/chat/${chatId}/update`, {
        chunks:chunks,
        numofresults:numOfResults,
        modelname:selectedModel
      });

}

import {axiosInstance}from './axiosInstance.tsx';



export  async function getAllModels(){


    return await axiosInstance.get("/get/models");

}

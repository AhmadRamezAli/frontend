import {api} from './axiosAPI';


export  async function loginAPI(password,email){


      return await api.post("/users/login", {
        password:password,
        email:email
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });


}

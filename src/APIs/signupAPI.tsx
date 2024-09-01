import {api} from './axiosAPI';


export  async function signupAPI(password,username){


      return await api.post("/users/signup", {
        password:password,
        email:username
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

}

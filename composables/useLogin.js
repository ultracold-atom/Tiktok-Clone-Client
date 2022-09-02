const axios = require('axios')
import {ref} from "vue";


const login = async (data) =>{
  try {
    const result = await axios.post("http://localhost:3000/login",data)  
    if(result.data.token){
      return result.data.token  
    }
  } catch (error) {
      return false
  }  
}


const useLogin = () =>{
  const videoList = ref([]);
  //Get all videos from Server
  
  async function onLogin({username,password}) {
    const result = await login({username,password})
    if(result){
      localStorage.setItem("token",result)  
      return true
    } else{
        return false
    }
  }

  return{
    videoList,
    onLogin
  };  
};

export default useLogin
const axios = require('axios')
import {ref} from "vue";


const getVideoList = async () =>{
  try {
    const result = await axios.get(
      `http://localhost:3000/videos?token=${localStorage.getItem('token')}` )  
    return result.data
  } catch (error) {
      return [];
  }  
}


async function likeVideo(id,token) {
  try {
    const result = await axios.post("http://localhost:3000/videos/" + id + "/like",{token})  
    return result.data
  } catch (error) {
      return [];
  }      
}


const videoList = ref([]); 

const useVideo = () =>{
 
  //Get all videos from Server
  
  async function fetchVideos() {
    videoList.value = await getVideoList();
  }

  async function onLikeVideo(id) {
    try {
      await likeVideo(id,localStorage.getItem('token'))
      //Edit if video is liked
      videoList.value = videoList.value.map((video)=>{

        if(video.isLiked){
          video.likeCounter -= 1;
        } else{ 
          video.isLiked += 1;
        }

        if(video._id === id){
          video.isLiked = !video.isLiked
          return video
        }
        return true
      })

      return true
    } catch (error) {
        return false
    }
  }

  return{
    videoList,
    fetchVideos,
    onLikeVideo
  };  
};

export default useVideo
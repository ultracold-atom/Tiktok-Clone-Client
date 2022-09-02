<template>
  <div ref="videoRef" class="video" @click="onToggleVideo">
    <TopVideo :username="video.owner.username" />
    <video class="video-element" :src="video.source" volume="0.3" controls loop></video>   
    <div class="video-bottom">
      <InfoVideo :username="video.owner.username" :description="video.description" />
      <ControlVideo 
      :like="video.likeCounter" :comment="video.commentCounter" 
      :share="video.shareCounter"  :id="video._id" :isLiked="video.isLiked" />
    </div> 
  </div>

</template>



<script>
import { onBeforeMount, onMounted, ref } from 'vue';
import TopVideo from './TopVideo.vue'
import InfoVideo from './InfoVideo.vue'
import ControlVideo from './ControlVideo.vue';
export default {
  name: 'App',
  components: {
    TopVideo,
    InfoVideo,
    ControlVideo
},
  props:{
    video:{
      type: Object
    }
  },
  setup(){
    const videoRef = ref(null)
    const isPlaying = ref(false)

    function reCalVideoSize(){
      console.log(window)
      console.log(videoRef.value.style && videoRef.value)
      videoRef.value.style.height = window.innerHeight + "px"
      videoRef.value.style.width = (window.innerHeight*9)/16 + "px"
    }

    function onToggleVideo(){
      console.log(videoRef.value.querySelector('.video-element'))
      const videoElement = videoRef.value.querySelector(".video-element")

      if(isPlaying.value){
        videoElement.pause()
      } else{
          videoElement.play()         
      }
      isPlaying.value = !isPlaying.value
    

      videoElement.play()
    }

    onMounted(()=>{
    
      reCalVideoSize()
      window.addEventListener("resize",reCalVideoSize)
      });
      onBeforeMount(()=>{
      window.removeEventListener("resize",reCalVideoSize)
      }) 
    
    return{onBeforeMount,onMounted,onToggleVideo,videoRef}
  }    
}
</script>

<template>
  <main>
    <TopVideo />
    <div class="video-inner">
      <VideoItem  v-for="(video,index) in videoList" :key="index" :video="video" />
      
    </div>  
    <LoginModal @onPlayVideo="activeFirstVideo" />  
  </main>
</template>

<script>
import VideoItem from './components/VideoItem.vue';
import TopVideo from './components/TopVideo.vue';
import LoginModal from './components/LoginModal.vue';
import useVideo from '../composables/useVideos'
import { onMounted,ref} from '@vue/runtime-core';

export default {
  name: 'App',
  components: {
    VideoItem,
    TopVideo,
    LoginModal
},
  setup(){

    const observerForScroll = ref(null)
    const videoRef = ref(null)
    const {videoList,fetchVideos} = useVideo()

    fetchVideos()

    let activeFirstVideo = ()=>{
      let targets = document.querySelectorAll(".video-inner .video");
      targets[0].querySelector(".video-element").play()
    }
    
    onMounted(()=>{
      let options = {
        root : document.querySelector('.video-inner'),
        rootMargin : '0px',
        threshold : 1.0
      }
    let currentVideoElement = null; 
    observerForScroll.value = new IntersectionObserver((entries)=>{
        if(entries && entries.length === 1 && entries[0].isIntersecting){
          if(currentVideoElement){
            currentVideoElement.pause();
            currentVideoElement.currentTime = 0;
          }
          currentVideoElement = entries[0].target.querySelector(".video-element")
          entries[0].target.querySelector(".video-element").play()
        }
      },options);

      let targets = document.querySelectorAll(".video-inner .video")
      targets.forEach((target)=>{
        observerForScroll.observe(target)
      })

    })
    return{activeFirstVideo,videoRef,videoList}
  }

}
</script>

<style>

</style>

<template>
  <nav class="video-control">
    <ul>
      <li>
        <button class="video-control-btn" @click="onLiked">
          <HeartIcon size="40" />
          <fa icon="heart" :style="{color:isLiked ? 'red' : 'white'}" />
          <span>{{like}}</span>
        </button>
      </li>
      <li>
        <button class="video-control-btn">
          <ChatIcon size="40" />
          <fa icon="fa fa-comment" />          
          <span>{{comment}}</span>
        </button>
      </li> 
      <li>
        <button class="video-control-btn">
          <ShareIcon size="40" />
          <fa icon="fa fa-share-alt" />          
          <span>{{share}}</span>
        </button>
      </li>           
    </ul>
  </nav> 

</template>


<script>
 
import useVideo from '../../composables/useVideos'
//import { ChatIcon,HeartIcon,ShareIcon } from "@vue-hero-icons/solid"
export default {
  //components:{HeartIcon,ChatIcon,ShareIcon}
  props:{
    like:{
      type:Number,
      required:true
    },
    share:{
      type:Number,
      required:true
    },
    comment:{
      type:Number,
      required:true
    },
    id:{
      type: String,
      required: true
    },
    isLiked:{
      type: Boolean,
      required: true
    } 
  },
  setup(props){
  
    const {onLikeVideo} = useVideo()

    async function onLike() {
      if(localStorage.getItem("token")){
        await onLikeVideo(props.id)
      }
    }
    return {onLike}
  }
}
</script>
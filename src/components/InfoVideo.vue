<template>
  <section class="video-info">
    <p class="video-info-desc">{{description}}</p>
  </section>  
</template>


<script>
export default {
  props:{
    username:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    }
  }
}
</script>
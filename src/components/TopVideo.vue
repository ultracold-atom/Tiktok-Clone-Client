<template>
  <nav class="tabs">
    <ul>
      <li class="logo"><img src="../assets/tikkk.jpg" ></li>
      <li class="username"><h3>{{username}}</h3></li>                 
    </ul>
  </nav>  
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



<style>

.tabs{
  display: flex;
  justify-content: space-between;
}


img{
  width: 30px;
  background: black;
  margin-top: 25px;
}

</style>
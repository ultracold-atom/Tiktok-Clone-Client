<template>

    <div id="modal-login" v-if="isActivated">
      <div class="modal-form">

        <template v-if="!userLoggedIn">
            <h2>Join Our Community</h2>
            <form @submit.prevent="onSubmit">
            <label for="">
                <p>Username : </p>
                <input v-model="username" type="text" placeholder="Please enter username">
            </label>
            <label for="">
                <p>Password : </p>
                <input v-model="password" type="text" placeholder="Please enter password">
            </label>
            <button type="submit">Get Started</button>
            </form> 
        </template> 

        <template v-else>
          <h2>Welcome Back!!</h2>
          <button type="button" @click="onPlayVideoFromModal">Start Watch</button>
        </template>
      </div>
    </div> 

</template>


<script>
import {computed,ref} from 'vue'
import useLogin from '../../composables/useLogin';
export default {
  emits:['onPlayVideo'], 
  setup(props,{emit}){
    const {onLogin} = useLogin() 

    const username = ref('')
    const password = ref('')
    const isActivated = ref(true)
    const userLoggedIn = ref(localStorage.getItem('token') ? true : false)

    async function onSubmit() {
      const result = await onLogin({
        username:username.value,
        password:password.value
      })
      if(result){
        isActivated.value = false
        emit('onPlayVideo')
      }
    }

    function onPlayVideoFromModal() {
      isActivated.value = false;
      emit("onPlayVideo")
    }

    const name = computed(()=>{
      return  localStorage.getItem("token") ? localStorage.get("token") : "User TikTok"
    }) 

    return {username,password,userLoggedIn,name,isActivated,onPlayVideoFromModal,onSubmit}
 }  
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="logIn">
      <input type="text" name="email" placeholder="Email" required="required" v-model="email" />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
        required="required"
      />
      <button type="submit" class="btn btn-primary btn-block btn-large">
        Let me in.
      </button>
    </form>

    <div>
      <a
        href=""
        type="button"
        class="btn btn-primary btn-large justify-content-end"
        style="color: marron"
        @click.prevent="register"
      >
        Register Here</a
      >
    </div>
    <!-- OAUTH -->
    <div class="input-group">
      <h6 class="mt-2 text-white">or sign up using</h6>
      &nbsp;
      <div
        class="flex-c-m m-r-5 g-signin2"
        data-longtitle="true"
        data-onsuccess="onSignIn"
      ></div>
    </div>
    <!-- OAUTH -->
  </div>
</template>

<script>
import axios from "../config/axios"

export default {
  name:'login',
  data(){
    return{
      email:'',
      password:''
    }
  },
  props:['reloadUlang'],
  methods:{
    logIn(){
      let dataUser = {email:this.email, password:this.password}

      axios.post('/user/login',dataUser)
        .then(res=>{
          localStorage.access_token = res.data.access_token
          localStorage.name = res.data.name
          this.$emit('changePage','home-page')
          this.reloadUlang()
        })
        .catch(err=>{
          console.log(err.response.data.msg)
        })
    },

    register(){
      this.$emit('changePage','register-page')
    }
  }
};
</script>
  
<style>
  .body{
  background: #092756;
	background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
	background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
  }
</style>
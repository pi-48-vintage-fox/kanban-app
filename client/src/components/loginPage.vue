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
    <div class="input-group" >
      <h6 class="mt-2 text-white">or sign up using</h6>
      &nbsp;
      <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
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
      password:'',
      clientId:'955542188652-0lsbb6ugk8jo89g2ila58jm7mu3cuf7p.apps.googleusercontent.com'
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
    },
    OnGoogleAuthSuccess (idToken) {
      var google_access_token = idToken
      // Receive the idToken and make your magic with the backend
      axios({
        url:'/user/googleLogin',
        method:'POST',
        data:{
          google_access_token
        }
      })
      .then(res=>{
        // console.log(res.data.access_token,'sudah sampe sini')
        localStorage.access_token = res.data.access_token
        localStorage.name = res.data.name
        this.$emit('changePage','home-page')
        this.reloadUlang()
      })
      .catch(err=>{
        console.log(err.response.data.msg,'masuk sini')
      })

    },
    OnGoogleAuthFail (error) {
      console.log(error)
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
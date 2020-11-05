<template>  
  <div class="container" id="login-page">
    <div class="auth-container">
      <div class="logo" style="transform:scale(1.5); margin-bottom: 1rem;">
        <h2 class="kang">KANG</h2>
        <h2 class="bang">BANG</h2>
      </div>
      <div class="logo-sub">
        <p>Explode your Productivity!</p>
      </div>
      <div class="card auth-card shadow-sm" style="margin-top: 1rem;">
        <form method="POST" @submit.prevent="login">
          <div class="input-group">
            <input type="text" name="email" class='full-width shadow-sm' id="email" placeholder="Email" v-model="email">
          </div>
          <div class="input-group">
            <input type="password" name="password" class='full-width shadow-sm' id="password" placeholder="password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary shadow-sm full-width ">Sign In</button>
          <div class="divider"><hr/></div>
          <p style="margin-bottom: 5px;">
            - Or -
          </p>
          <div class="g-signin2" data-width="350"  data-longtitle="true" data-onsuccess="onSignIn"></div>
          <div class="divider" style="margin-top:10px"><hr/></div>

          <p style="margin-top: 5px;" class="text-sm">
            Didnt have acount ? <a href="#" class="link" @click="register">Sign up now</a>
          </p>
        </form>
      </div>
      <p class="author">Created by Mochamad Zulfikar</p>
    </div>

  </div>
</template>

<script>
export default {
  name:"LoginPage",
  data(){
    return{
      email: "",
      password: ""
    }
  },
  methods:{
    login(){
      let payload = {
        email: this.email,
        password : this.password
      }
      this.$emit("login",payload)
    },
    register(){
      this.$emit("changePage",{page:"Register"})
    }
  }
  

}
</script>


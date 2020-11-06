<template>
   <div class="container" id="register-page">
    <div class="auth-container">
      <div class="logo" style="transform:scale(1.5); margin-bottom: 1rem;">
        <h2 class="kang">KANG</h2>
        <h2 class="bang">BANG</h2>
      </div>
      <div class="logo-sub">
        <p>Stop Starting, Start Finishing</p>
      </div>
      <div class="card auth-card shadow-sm" style="margin-top: 1rem;">
        <form method="POST" @submit.prevent="register">
          <p style="margin-bottom: 1rem;">Registration</p>        
          <div class="input-group">
            <input type="text" name="email" class='full-width shadow-sm' id="email" placeholder="Your Email" v-model="email">
          </div>
          <div class="input-group">
            <input type="password" name="password" class='full-width shadow-sm' id="email" placeholder="Password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary shadow-sm full-width mb-1 ">Register</button>          
          <button type="button" class="btn btn-danger shadow-sm full-width" @click="changePage">Cancel</button>          
        </form>
      </div>
      <p class="author">Created by Mochamad Zulfikar</p>
    </div>

  </div>

</template>

<script>
export default {
  name:"RegisterPage",
  data(){
    return{
      email: "",
      password: ""
    }
  },
  methods:{
    register(){
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$emit('register',payload)
    },
    changePage(){
      this.$emit("changePage",{page:"Login"})
    }
  }
}
</script>

<style>

</style>
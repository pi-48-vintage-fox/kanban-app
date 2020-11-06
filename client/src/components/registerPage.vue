<template>
  <div class="login">
    <h1>Register Here</h1>
    <form @submit.prevent="registering">
      <input
        type="text"
        name="email"
        placeholder="Full Name"
        required="required"
        v-model="name"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        required="required"
        v-model="email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
        required="required"
      />
      <button type="submit" class="btn btn-primary btn-block btn-large">
        Make an account
      </button><br>
      <div>

      <button @click.prevent="back" class="btn btn-primary btn-block btn-large">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../config/axios';

export default {
  name: "registerPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    back() {
      this.$emit("changePage", "login-page");
    },

    registering(){
      let data = {name:this.name,email:this.email,password:this.password}

      axios.post('/user/register',data)
      .then(response=>{
        this.$emit('changePage','login-page')
      })
      .catch(err=>{
          console.log(err.response.data.msg)
        })
    }
  },
};
</script>

<style>
</style>
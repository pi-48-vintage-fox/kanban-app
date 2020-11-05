<template>
  <div id="login" class="container">
    <div class="row">
      <div class="col" style="padding: 0">
        <button
          @click="$emit('change-page','login-page')"
          type="button"
          class="btn btn-primary btn-block"
        >
          Login
        </button>
      </div>
      <div class="col" style="padding: 0">
        <button
          @click="$emit('change-page','register-page')"
          type="button"
          class="btn btn-primary btn-block active"
        >
          Register
        </button>
      </div>
    </div>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="login-email">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="login-email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="login-password">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="login-password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-outline-primary btn-block">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "../config/axios"
export default {
  name: "LoginPage",
  data(){
      return {
        email : '',
        password : '',
      }
  },
  methods : {
        login(){
            axios({
                method: 'post',
                url: '/login',
                data : {
                    email : this.email,
                    password : this.password
                }
              })
                .then(result => {
                    console.log(result.data,"<<ini berhasil")
                    localStorage.email = result.data.email
                    localStorage.id = result.data.id
                    localStorage.access_token = result.data.access_token
                    this.email = ""
                    this.password = ""
                    this.$emit('change-page','home-page')
                })
                .catch(error=>{
                    Swal.fire(
                      'ALERT',
                      `${error.response.data.msg}`,
                      'error'
                    )
                    this.email = ""
                    this.password = ""
                })
                
        }
  },
  props: []
};
</script>

<style>
</style>
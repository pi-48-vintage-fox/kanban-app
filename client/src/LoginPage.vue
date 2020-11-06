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
        {{btnTxt}}
      </button>
    </form>
    <table width="100%">
      <tr>
        <td><hr /></td>
        <td style="width:1px; padding: 0 10px; white-space: nowrap;">Login with Social Account</td>
        <td><hr /></td>
      </tr>
    </table>
    <button v-google-signin-button="clientId" class="btn btn-outline-primary btn-block"><i class="fab fa-google"></i> {{btnTxt}} </button>
    <hr>
    <p class="text-center">&copy;2020 - Abdul Rasyid Anshori</p>
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
        clientId: '400139034231-q4fan6eteb0tm8diqdoouvcltsc26bfb.apps.googleusercontent.com',
        btnTxt: 'LOGIN'
      }
  },
  methods : {
        login(){
          this.btnTxt = "Please Wait..."
            axios({
                method: 'post',
                url: '/login',
                data : {
                    email : this.email,
                    password : this.password
                }
              })
                .then(result => {
                    this.btnTxt = "LOGIN"
                    localStorage.email = result.data.email
                    localStorage.id = result.data.id
                    localStorage.access_token = result.data.access_token
                    this.email = ""
                    this.password = ""
                    this.$emit('change-page','home-page')
                })
                .catch(error=>{
                  this.btnTxt = "LOGIN"
                    Swal.fire(
                      'ALERT',
                      `${error.response.data.msg}`,
                      'error'
                    )
                    this.email = ""
                    this.password = ""
                })
                
        },
        OnGoogleAuthSuccess (idToken) {
        this.btnTxt = "Please Wait..."
            axios({
                method: 'post',
                url: '/googleLogin',
                data : {
                    google_token : idToken
                }
              })
                .then(result => {
                    this.btnTxt = "LOGIN"
                    localStorage.email = result.data.email
                    localStorage.id = result.data.id
                    localStorage.access_token = result.data.access_token
                    this.email = ""
                    this.password = ""
                    this.$emit('change-page','home-page')
                })
                .catch(error=>{
                  this.btnTxt = "LOGIN"
                    Swal.fire(
                      'ALERT',
                      `${error.response.data.msg}`,
                      'error'
                    )
                    this.email = ""
                    this.password = ""
                })
        },
        OnGoogleAuthFail (error) {
          Swal.fire(
            'ALERT',
            `Cancel Login with Google Account`,
            'error'
          )
        }
  },
  props: []
};
</script>

<style>
</style>
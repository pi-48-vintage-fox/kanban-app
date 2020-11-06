<template>
  <div>
      <div class="container">
          <h1 class="row justify-content-center mt-5">Kanban Apps</h1>
          <div class="row justify-content-center mt-5">
            <form @submit.prevent="login">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="data.email"  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="data.password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <button @click.prevent="registerForm" class="btn btn-warning">Register</button>
            </form>
          </div>
          <br>
          <center><button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button></center> 
        
      </div>
     
  </div>
</template>

<script>
import axios from "../../config/axios"
export default {
    name: "login",
    data() {
        return {
            data: {
                email: '',
                password: ''
            },
            clientId: '305905869131-gs7en60rj22r277if8u7vok8a7mpjovs.apps.googleusercontent.com'
        }
    },
    methods: {
        login(email) {
            axios({
                url: '/login',
                method: 'POST',
                data: {
                    email: this.data.email,
                    password: this.data.password
                }
            })
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login successfuly',
                    showConfirmButton: false,
                    timer: 1500
                    })
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('emailIsLogin', this.data.email)
                this.$emit('login')
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data
                    })
            })
        },
        registerForm() {
            console.log("dari login");
            this.$emit('registerForm','registerForm')
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken)
            // Receive the idToken and make your magic with the backend

            axios({
                url: "/googleLogin",
                method: "POST",
                data: { google_access_token : idToken}
            })
            .then(response => {
                console.log(response);
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('emailIsLogin', response.data.email)
                this.$emit('login')
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
        
    }
}
</script>

<style>
.google-signin-button {
  color: green;
  background-color: whitesmoke;
  height: 30px;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
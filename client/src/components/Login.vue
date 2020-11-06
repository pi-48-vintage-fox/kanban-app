<template>
  <div class="container" id="login">
        <form @submit.prevent="login">
            <div style="width: 50%; margin: 200px auto;">
              <h1>Login</h1>
                <div class="form-group">
                  <label for="login-email">Email</label>
                  <input type="email" v-model="email" class="form-control" id="login-email" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="password" class="form-control" id="login-password" >
                </div>
                <div class="row">
                  <div class="col">
                    <button type="submit" class="btn btn-primary form-control">LOGIN</button>
                  </div>
                  <div class="col">
                    <button type="button" @click.prevent="toRegister" class="btn btn-primary form-control" id="registertog">REGISTER</button>
                  </div>
                </div>
                <div class="text-center font-weight-bold">
                  <h6>== Another Account ==</h6>
                </div>
                <div class="row">
                  <div class="g-signin2 col" data-onsuccess="onSignIn"></div>
                  </div>
            </div> 
          </form>
      </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name:'LoginPage',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods :{
        login(){
            let payload = {  
                email: this.email,
                password: this.password
            }
            this.$emit('login', payload)
        },
        toRegister(){
            this.$emit('changePage', 'register-page')
        }
    }
}
</script>

<style>

</style>
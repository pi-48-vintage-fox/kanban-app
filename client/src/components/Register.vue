<template>

 <div class="container-login-page shadow bg-white rounded ">
   <div class="cont-log-page">
           </div>
           <div class="form-log-page">
              <div class="text-login mt-2">Register</div>
              <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s12 email-form">
                        <input id="email" type="email" class="validate" v-model="email_register">
                        <label for="email">Email</label>
                        
                      </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 password-form">
                          <input id="username" type="text" class="validate" v-model="username_register">
                          <label for="username">Username</label>
                          
                        </div>
                      </div>
                    <div class="row">
                        <div class="input-field col s12 password-form">
                          <input id="password" type="password" class="validate" v-model="password_register">
                          <label for="password">Password</label>
                          
                        </div>
                      </div>
                      <button class="btn waves-effect red darken-1" 
                              type="submit" name="action" 
                              style="width: 40%"
                              @click.prevent="register"
                      >
                           Register 
                      </button>
                      
                  </form>
                </div>
              <p class="text"> Already a member?<a id="link" @click.prevent="toLogin" > Sign In </a> </p>
           </div>
 </div>

</template>

<script>
import './style.css'
import M from 'materialize-css'
import axios from '../config/axios'
export default {
  
  name: 'Login',
  data(){
    return {
      message: 'hello from register page',
      email_register: '',
      username_register: '',
      password_register: '',
      
     
    }
  },
 
  methods: {
    register(){
      
      axios({
        url: '/register',
        method: 'POST',
        data: {
          email: this.email_register,
          password: this.password_register,
          username: this.username_register
        }
      })
        .then(({data}) => {
          console.log(data.username);
          this.toLogin()

          
        })
        .catch(err => {
          console.log('ini register');
          console.log(err.response);
          
        })
    },
    toLogin(){
      this.$emit('toLoginPage', true)
    }
  
  },
 
}
</script>


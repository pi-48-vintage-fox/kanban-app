<template>
      <div class="container" id="register">
        <form @submit.prevent="register" >
          <div style="width: 50%; margin: 200px auto;">
            <h1>Register</h1>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="email" class="form-control">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="password" class="form-control">
            </div>
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-primary form-control">Register</button>
              </div>
              <div class="col">
                <button type="button" @click.prevent="back" class="btn btn-primary form-control" id="backtog">Back</button>
              </div>
          </div>
          </div>
        </form>
      </div>
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            email : '',
            password : ''
        }        
    },
    methods :{
        register(){
            let payload = {  
                email: this.email,
                password: this.password
            }
            this.$emit('register', payload)
        },
        back(){
            console.log('back register')
            this.$emit('changePage', 'login-page')
        },
    }
}
</script>

<style>

</style>
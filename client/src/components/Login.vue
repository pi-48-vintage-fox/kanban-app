<template>
      <section class="container-fluid" id="landing">
      <div class="login-box done">
        <div class="row justify-content-center">
          <div class="col">
            <div class="row">
              <div class="col masuk">Masuk</div>
              <div class="col register-click" @click.prevent="toRegister">
                Register
              </div>
            </div>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" v-model="email" id="login-email" class="form-control" />
              </div>
              <div class="form-group">
                <label for="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  class="form-control"
                  v-model="password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <span>Atau</span>
              <div class="g-signin2 text-tengah" data-onsuccess="onSignIn"></div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name : 'Login',
  data(){
    return {
      email : '',
      password : ''
    }
  },
  methods : {
    login(){
      let payload = {
        email : this.email,
        password : this.password
      }
      this.$emit('login', payload)
    },
    toRegister(){
      let payload = {
        name : 'register-page'
      }
      this.$emit('changePage', payload)
    },
    toGoogleLogin(){
      
    }
  }

}
</script>

<style>

</style>
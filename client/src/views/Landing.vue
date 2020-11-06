<template>
  <div id="landing-page">
    <section id="landing-page-left"></section>
    <section id="landing-page-right">
      <div id="container-auth">
        <div id="auth-content">
          <div v-if="isLoginForm" id="auth-title">Login</div>
          <div v-if="!isLoginForm" id="auth-title">Create Account</div>
          <div id="auth-oauth">
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
          </div>
          <div id="auth-form">
            <form id="loginForm" @submit.prevent="submitLoginForm">
              <div
                class="notification notification-error"
                style="display:none"
              ></div>

              <label v-if="isLoginForm" for="user">Username/Email</label>
              <input
                v-if="isLoginForm"
                type="text"
                name="user"
                id="user"
                v-model="user"
                placeholder="Insert your username or email"
                autofocus
                required
              />
              <label v-if="!isLoginForm" for="username"
                >Username<small>*optional</small></label
              >
              <input
                v-if="!isLoginForm"
                type="text"
                name="username"
                id="username"
                v-model="username"
                placeholder="Insert your username"
                autofocus
                required
              />
              <label v-if="!isLoginForm" for="user">Email</label>
              <input
                v-if="!isLoginForm"
                type="text"
                name="email"
                id="email"
                v-model="email"
                placeholder="Insert your email"
                required
              />

              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Insert your password"
                required
              />

              <div class="actions">
                <button v-if="isLoginForm" class="button button-secondary">
                  Log In
                </button>
                <button v-if="!isLoginForm" class="button button-secondary">
                  Create Account
                </button>
              </div>

              <p v-if="isLoginForm">
                I want to
                <a
                  id="link-register"
                  @click="toggleLoginForm"
                  href="javascript:void(0)"
                >
                  create an account
                </a>
              </p>
              <p v-if="!isLoginForm">
                I want to
                <a
                  id="link-login"
                  @click="toggleLoginForm"
                  href="javascript:void(0)"
                >
                  login to my account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'LandingPage',
    data() {
      return {
        user: '',
        username: '',
        email: '',
        password: '',
        isLoginForm: true,
        baseUrl: 'http://localhost:3000',
      }
    },
    methods: {
      getToken() {
        return localStorage.getItem('access_token')
      },

      saveToken(token) {
        localStorage.setItem('access_token', token)
      },
      getAvatar() {
        return localStorage.getItem('avatarUrl')
      },

      saveAvatar(url) {
        localStorage.setItem('avatarUrl', url)
      },
      toggleLoginForm() {
        this.isLoginForm = !this.isLoginForm
      },

      signOut() {
        console.log('ini token', getToken())
        const auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(() => {
          console.log('User signed out.')
          localStorage.removeItem('access_token')

          this.$emit('changePage', 'landing-page')
        })
      },

      submitLoginForm() {
        const { user, password, email, username } = this

        if (this.isLoginForm) {
          console.log('submit login form')

          axios({
            method: 'POST',
            url: this.baseUrl + '/login',
            data: {
              user,
              password,
            },
          })
            .then(({ data }) => {
              console.log('berhasil login', data)
              this.saveToken(data.access_token)
              this.saveAvatar(data.avatarUrl)
              localStorage.setItem('organization', data.organization)
              this.$emit('showMessage', {
                type: 'success',
                msg: 'Login successful',
              })
              this.$emit('changePage', 'home-page')
            })
            .catch((err) => {
              console.log(err.response)

              this.$emit('showMessage', {
                msg: err,
                type: 'error',
              })
            })
        } else {
          console.log('submit register form')

          axios({
            method: 'POST',
            url: this.baseUrl + '/register',
            data: {
              username,
              email,
              password,
            },
          })
            .then(({ data }) => {
              console.log('berhasil register', data)
              this.$emit('showMessage', {
                msg: 'Account registration successful',
                type: 'success',
              })
              this.isLoginForm = true
            })
            .catch((err) => {
              console.log(err)
              console.log(err.response)
              this.$emit('showMessage', {
                msg: err,
                type: 'error',
              })
            })
        }
      },
      onSignIn(googleUser) {
        console.log('on google sign in')

        const id_token = googleUser.getAuthResponse().id_token
        console.log('id_token', id_token)
        axios({
          method: 'POST',
          url: this.baseUrl + '/googleLogin',
          data: { token: id_token },
        })
          .then(({ response }) => {
            console.log(response)
            this.saveToken(response.access_token)
            this.saveAvatar(response.avatarUrl)
            localStorage.setItem('organization', response.organization)

            this.$emit('showMessage', {
              msg: 'Login successfull',
              type: 'success',
            })
            this.$emit('changePage', 'home-page')
          })
          .catch((err) => {
            console.log(err)
            this.$emit('showMessage', { msg: err, type: 'error' })
          })
      },
    },
  }
</script>

<style></style>

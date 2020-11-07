<template>
  <div id="auth-content">
    <div id="auth-title">Login</div>
    <div
      v-if="errorBanner"
      class="notification notification-banner notification-error"
    >
      {{ errorBanner }}
    </div>
    <div id="auth-oauth">
      <div id="gSignIn" class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
    <div id="auth-form">
      <form id="loginForm" @submit.prevent="submitLoginForm">
        <label for="user">Username/Email</label>
        <input
          type="text"
          name="user"
          id="user"
          v-model="user"
          placeholder="Insert your username or email"
          autofocus
        />
        <div
          v-if="errors.user.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.user" :key="i">
              {{ error }}
            </li>
          </ul>
        </div>

        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Insert your password"
        />
        <div
          v-if="errors.password.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.password" :key="i">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="actions">
          <button class="button button-secondary">
            Log In
          </button>
        </div>
        <p>
          I want to
          <a
            id="link-register"
            @click="toggleLoginForm"
            href="javascript:void(0)"
          >
            create an account
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from '../../config/axios'

  export default {
    data() {
      return {
        name: 'FormLogin',
        user: '',
        password: '',
        errors: {
          user: [],
          password: [],
        },
        errorBanner: null,
      }
    },
    mounted() {
      this.renderGoogleButton()
    },
    methods: {
      submitLoginForm() {
        const { user, password, errors } = this
        console.log({ user, password, errors })

        if (this.validateLogin()) {
          for (let key in this.errors) {
            this.errors[key] = []
          }
          this.errorBanner = null

          console.log('submit login form')

          axios({
            method: 'POST',
            url: '/login',
            data: {
              user,
              password,
            },
          })
            .then(({ data }) => {
              console.log('berhasil login', data)
              localStorage.setItem('access_token', data.access_token)
              localStorage.setItem('avatarUrl', data.avatarUrl)
              localStorage.setItem('organization', data.organization)
              this.user = ''
              this.password = ''
              this.$emit('showMessage', {
                type: 'success',
                msg: 'Login successful',
              })
              this.$emit('changePage', 'home-page')
            })
            .catch((err) => {
              console.log(err.response)

              if (err.response?.status === 401) {
                this.errorBanner = err.response.data.msg
              }

              this.$emit('showMessage', {
                msg: err,
                type: 'error',
              })
            })
        }
      },
      validateLogin() {
        for (let key in this.errors) {
          this.errors[key] = []
        }
        console.log('validating login form')
        if (!this.user) {
          this.errors.user.push('Username or email address is required')
        }
        if (!this.password) {
          this.errors.password.push('Password is required')
        }
        console.log('errors:', JSON.stringify(this.errors, null, 2))

        for (let key in this.errors) {
          if (this.errors[key].length > 0) {
            console.log('validation pass fail')
            return false
          }
        }

        console.log('validation pass success')

        return true
      },
      toggleLoginForm() {
        this.$emit('toggleLoginForm')
      },
      renderGoogleButton() {
        if (!gapi) return
        gapi.signin2.render('gSignIn', {
          onsuccess: (user) => {
            // this.onSignIn(user)
            this.$emit('onSignIn', user)
          },
          onerror: (err) => {
            console.log('Google signIn2.render button err: ' + err)
          },
        })
      },
      onSignIn(user) {
        this.$emit('onSignIn', user)
      },
    },
  }
</script>

<style></style>

<template>
  <div id="landing-page">
    <section id="landing-page-left">
      <p class="landing-title">Kanban App</p>
      <p class="landing-subtitle">
        Easy to use Kanban App to easily manage your projects
      </p>
    </section>
    <section id="landing-page-right">
      <div id="container-auth">
        <!-- <div id="auth-content">
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
              <!-- <label v-if="!isLoginForm" for="username"
                >Username<small>*optional</small></label
              > -->
              <!-- <input
                v-if="!isLoginForm"
                type="text"
                name="username"
                id="username"
                v-model="username"
                placeholder="Insert your username"
                autofocus
                required
              /> -->
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
              <label v-if="!isLoginForm" for="confirmPassword"
                >Confirm Password</label
              >
              <input
                v-if="!isLoginForm"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                v-model="confirmPassword"
                placeholder="Re-type your password"
                required
              />

              <label v-if="!isLoginForm" for="organization"
                >Select organization</label
              >
              <select
                v-if="!isLoginForm"
                v-model="organization"
                name="organization"
              >
                <option
                  v-for="org of organizations"
                  :key="org.id"
                  :value="org.id"
                  >{{ org.name }}</option
                >
              </select>

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
        </div> -->
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
        confirmPassword: '',
        isLoginForm: true,
        organization: '',
        organizations: '',
        baseUrl: 'https://kanban-app-riva.herokuapp.com',
        errors: {
          email: '',
          user: '',
          password: '',
          confirmPassword: '',
          organization: '',
        },
      }
    },
    created() {
      this.fetchOrganizations()
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

      fetchOrganizations() {
        console.log('fetch organizations')
        axios({
          method: 'GET',
          url: this.baseUrl + '/organizations',
        })
          .then(({ data }) => {
            console.log(data, '<<<< organizations')
            this.organizations = data
          })
          .catch((err) => {
            console.log(err.data)
            this.$emit('showMessage', {
              msg: err.data,
              type: 'error',
            })
          })
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
        const {
          user,
          password,
          email,
          username,
          confirmPassword,
          organization,
          errors,
        } = this

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

              this.$emit('showMessage', {
                msg: err.data,
                type: 'error',
              })
            })
        } else {
          console.log('submit register form')

          console.log({
            username,
            email,
            password,
            organization,
          })

          if (this.validateRegistration) {
            axios({
              method: 'POST',
              url: this.baseUrl + '/register',
              data: {
                username,
                email,
                password,
                OrganizationId: organization,
              },
            })
              .then(({ data }) => {
                console.log('berhasil register', data)
                this.username = ''
                this.password = ''
                this.confirmPassword = ''
                this.$emit('showMessage', {
                  msg: 'Account registration successful',
                  type: 'success',
                })
                this.isLoginForm = true
              })
              .catch((err) => {
                this.$emit('showMessage', {
                  msg: err.data,
                  type: 'error',
                })
              })
          }
        }
      },
      validateRegistration() {
        let validate = true

        if (!email) {
          errors.email = 'Email is required'
          validate = false
        }
        if (!password) {
          errors.password = 'Password is required'
          validate = false
        }
        if (confirmPassword !== password) {
          errors.confirmPassword = 'Please re-type the password above'
          validate = false
        }

        if (!organization) {
          errors.organization = 'Please choose your organization'
          validate = false
        }

        return validate
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

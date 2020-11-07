<template>
  <div id="auth-content">
    <div id="auth-title">Create Account</div>
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
      <form id="registerForm" @submit.prevent="submitRegisterForm">
        <label for="user">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          v-model="email"
          placeholder="Insert your email"
          required
        />
        <div
          v-if="errors.email.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.email" :key="i">{{ error }}</li>
          </ul>
        </div>

        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Insert your password"
          required
        />
        <div
          v-if="errors.password.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.password" :key="i">{{ error }}</li>
          </ul>
        </div>

        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Re-type your password"
          required
        />
        <div
          v-if="errors.confirmPassword.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.confirmPassword" :key="i">
              {{ error }}
            </li>
          </ul>
        </div>

        <label for="organization">Select organization</label>
        <select v-model="OrganizationId" name="organization">
          <option
            v-for="org of organizations"
            v
            :key="org.id"
            :value="org.id"
            >{{ org.name }}</option
          >
        </select>
        <div
          v-if="errors.organization.length > 0"
          class="notification notification-error"
        >
          <ul>
            <li v-for="(error, i) in errors.organization" :key="i">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="actions">
          <button class="button button-secondary">
            Create Account
          </button>
        </div>
        <p>
          I want to
          <a id="link-login" @click="toggleLoginForm" href="javascript:void(0)">
            login to my account
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        OrganizationId: 1,
        errors: {
          email: [],
          password: [],
          confirmPassword: [],
          organization: [],
        },
        errorBanner: null,
      }
    },
    mounted() {
      this.renderGoogleButton()
    },
    props: {
      organizations: Array,
    },
    methods: {
      submitRegisterForm() {
        const {
          password,
          email,
          username,
          confirmPassword,
          organization,
          errors,
        } = this

        console.log('submit register form')

        console.log({
          email,
          password,
          confirmPassword,
          organization,
        })

        if (this.validateRegistration()) {
          for (let key in this.errors) {
            this.errors[key] = []
          }
          axios({
            method: 'POST',
            url: '/register',
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
              console.log(err)

              this.$emit('showMessage', {
                msg: err,
                type: 'error',
              })
            })
        }
      },
      toggleLoginForm() {
        this.$emit('toggleLoginForm')
      },
      validateRegistration() {
        for (let key in this.errors) {
          this.errors[key] = []
        }
        if (!this.email) {
          this.errors.email.push('Email is required')
        }
        if (!this.password) {
          this.errors.password.push('Password is required')
        }
        if (this.confirmPassword !== this.password) {
          this.errors.confirmPassword.push(
            'Password and password confirmation are different'
          )
        }

        if (!this.organization) {
          this.errors.organization.push('Please choose your organization')
        }

        for (let key in this.errors) {
          if (this.errors[key].length > 0) {
            console.log('validation pass fail')
            return false
          }
        }
        return true
      },
      renderGoogleButton() {
        if (!gapi) return
        gapi.signin2.render('gSignIn', {
          onsuccess: (user) => {
            this.onSignIn(user)
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

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
        <FormLogin
          @onSignIn="onSignIn"
          @showMessage="showMessage"
          @toggleLoginForm="toggleLoginForm"
          @changePage="changePage"
          v-if="isLoginForm"
        ></FormLogin>
        <FormRegister
          @onSignIn="onSignIn"
          @showMessage="showMessage"
          @toggleLoginForm="toggleLoginForm"
          @changePage="changePage"
          :organizations="organizations"
          v-if="!isLoginForm"
        ></FormRegister>
      </div>
    </section>
  </div>
</template>

<script>
  import FormLogin from '../components/FormLogin'
  import FormRegister from '../components/FormRegister'
  import axios from '../../config/axios'
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
    components: {
      FormLogin,
      FormRegister,
    },
    created() {
      this.fetchOrganizations()
    },
    methods: {
      setLoginForm(value) {
        isLoginForm(value)
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
          url: '/organizations',
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

      onSignIn(googleUser) {
        console.log('on google sign in')

        const id_token = googleUser.getAuthResponse().id_token
        console.log('id_token', id_token)
        axios({
          method: 'POST',
          url: '/googleLogin',
          data: { token: id_token },
        })
          .then((response) => {
            console.log(response, '>>> google sign in response')
            if (response.data.access_token)
              localStorage.setItem('access_token', response.data.access_token)
            if (response.data.avatarUrl)
              localStorage.setItem('avatarUrl', response.data.avatarUrl)
            if (response.data.organization)
              localStorage.setItem('organization', response.data.organization)

            this.$emit('showMessage', {
              msg: 'Login successfull',
              type: 'success',
            })
            this.$emit('changePage', 'home-page')
          })
          .catch((err) => {
            console.log(err, '>>>> google sign in error')
            this.$emit('showMessage', { msg: err, type: 'error' })
          })
      },
      showMessage(payload) {
        this.$emit('showMessage', payload)
      },
      changePage(payload) {
        this.$emit('changePage', payload)
      },
    },
  }
</script>

<style></style>

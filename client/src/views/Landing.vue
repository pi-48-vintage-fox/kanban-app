<template>
  <div id="landing-page">
    <section id="landing-page-left">
      <div class="landing-title-container">
        <p class="landing-title">Kanban Vue</p>
        <p class="landing-subtitle">
          Manage your projects easily <em>Kanban-style</em>
        </p>
      </div>
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
    props: {
      organizations: Array,
    },
    created() {},
    data() {
      return {
        user: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        isLoginForm: true,
        organization: '',
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
    methods: {
      setLoginForm(value) {
        isLoginForm(value)
      },

      toggleLoginForm() {
        this.isLoginForm = !this.isLoginForm
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

<template>
  <div>
    <Home
      v-if="page === 'home-page'"
      :organizations="organizations"
      @showMessage="showMessage"
      @changePage="changePage"
    ></Home>
    <Landing
      v-if="page === 'landing-page'"
      :organizations="organizations"
      @changePage="changePage"
      @showMessage="showMessage"
    ></Landing>

    <portal-target name="modals"></portal-target>
    <portal-target name="dropdowns"></portal-target>
    <portal-target name="tooltips"></portal-target>
  </div>
</template>

<script>
  import axios from '../config/axios'
  import Home from './views/Home'
  import Landing from './views/Landing'
  export default {
    name: 'App',
    data() {
      return {
        page: 'landing-page',
        organizations: null,
      }
    },
    components: {
      Home,
      Landing,
    },
    created() {
      this.fetchOrganizations()
      console.log(
        'from App: access_token:',
        localStorage.getItem('access_token')
      )
      this.page = localStorage.getItem('access_token')
        ? 'home-page'
        : 'landing-page'
    },
    methods: {
      changePage(page) {
        console.log('change page to', page)
        this.page = page
        console.log('current page:', this.page)
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
      showMessage(options) {
        let { msg, type } = options

        if (!options.duration) options.duration = 8000
        if (!options.toast) options.toast = true
        if (!options.progressBar) options.progressBar = true

        if (Array.isArray(msg)) {
          msg = msg.join(', ')
        } else {
          if (msg.response) {
            // error dari axios
            msg = msg.response.data.msg
          } else if (msg.responseJSON) {
            msg = msg.responseJSON.message
          } else if (msg.message) {
            msg = msg.message
          } else if (msg.statusText) {
            msg = msg.statusText
          }
        }

        if (options.toast) {
          const toast = new Toasty()

          toast.configure(options)

          switch (type) {
            case 'success':
              toast.success(msg)
              break
            case 'info':
              toast.info(msg)
              break
            case 'warning':
              toast.warning(msg)
              break
            case 'error':
              toast.error(msg)
              break
            default:
              toast.info(msg)
              break
          }
        }
      },
    },
  }
</script>

<style></style>

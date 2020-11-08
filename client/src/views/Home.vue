<template>
  <div>
    <div v-if="!user" class="loader-container">
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_h59xofz0.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
    </div>

    <ModalCompleteRegistration
      v-else-if="!user.OrganizationId || !user.name"
      :organizations="organizations"
      :user="user"
      @registrationCompleted="registrationCompleted"
    ></ModalCompleteRegistration>

    <div v-else id="home-page">
      <TheNavbar
        :user="user"
        @showMessage="showMessage"
        @changePage="changePage"
      ></TheNavbar>
      <div class="container container-home fullwidth">
        <TheBoardList
          :user="user"
          :categories="categories"
          :tasks="tasks"
          @showMessage="showMessage"
          @changePage="changePage"
          @fetchTasks="fetchTasks"
          @fetchCategories="fetchCategories"
        ></TheBoardList>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '../../config/axios'
  import TheNavbar from '../components/TheNavbar'
  import TheBoardList from '../components/TheBoardList'
  import ModalCompleteRegistration from '../components/ModalCompleteRegistration'
  // import io from 'socket.io-client'
  import socket from '../../config/socket'
  console.log({ socket })

  export default {
    name: 'Home',
    data() {
      return {
        categories: [],
        tasks: [],
        user: null,
        OrganizationId: null,
        errorBanner: false,
        errors: {
          name: [],
          OrganizationId: [],
        },
      }
    },
    props: {
      organizations: Array,
    },
    components: {
      TheNavbar,
      TheBoardList,
      ModalCompleteRegistration,
    },
    created() {
      this.fetchUserDetails()

      socket.on('tasks', (data) => {
        this.tasks = data
      })
      socket.on('categories', (data) => {
        this.categories = data
      })
    },
    methods: {
      getToken() {
        return localStorage.getItem('access_token')
      },
      fetchUserDetails() {
        console.log('fetching user details')
        axios({
          url: '/user',
          headers: {
            access_token: this.getToken(),
          },
        })
          .then(({ data }) => {
            console.log(data, '<<< user data')

            const {
              id,
              avatarUrl,
              OrganizationId,
              name,
              email,
              Organization,
            } = data

            this.user = {
              id,
              name,
              email,
              avatarUrl,
              OrganizationId,
              Organization,
            }

            if (data.OrganizationId) {
              this.fetchCategories()
              this.fetchTasks()
            }
          })
          .catch((err) => {
            console.log("Error fetching user's details:", err)
          })
      },
      fetchCategories() {
        console.log('fetch categories')
        axios({
          method: 'GET',
          url: '/categories',
          headers: {
            access_token: this.getToken(),
          },
        })
          .then(({ data }) => {
            console.log(data, '<<<< categories')
            this.categories = data

            socket.emit('categories', data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      fetchTasks() {
        console.log('fetch task')
        axios({
          method: 'GET',
          url: '/tasks',
          headers: {
            access_token: this.getToken(),
          },
        })
          .then(({ data }) => {
            console.log(data, '<<<<< tasks')
            this.tasks = data

            socket.emit('tasks', data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      showMessage(payload) {
        this.$emit('showMessage', payload)
      },
      changePage(payload) {
        console.log('changePage from home:', payload)
        this.$emit('changePage', payload)
      },

      registrationCompleted() {
        this.user = null
        this.fetchUserDetails()
      },
    },
  }
</script>

<style></style>

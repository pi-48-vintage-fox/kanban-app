<template>
  <div id="home-page">
    <BaseModal v-if="showModal === true"></BaseModal>
    <TheNavbar @showMessage="showMessage" @changePage="changePage"></TheNavbar>
    <div class="container container-home fullwidth">
      <TheBoardList
        :categories="categories"
        :tasks="tasks"
        @showMessage="showMessage"
        @changePage="changePage"
        @fetchTasks="fetchTasks"
        @fetchCategories="fetchCategories"
      ></TheBoardList>
    </div>
  </div>
</template>

<script>
  import axios from '../../config/axios'
  import TheNavbar from '../components/TheNavbar'
  import TheBoardList from '../components/TheBoardList'
  import BaseModal from '../components/BaseModal'

  export default {
    name: 'Home',
    data() {
      return {
        baseUrl: 'https://kanban-app-riva.herokuapp.com',
        categories: [],
        tasks: [],
        showModal: false,
      }
    },
    components: {
      TheNavbar,
      TheBoardList,
    },
    beforeCreate() {},
    created() {
      this.fetchCategories()
      this.fetchTasks()
      this.fetchUserDetails()
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
          })
          .catch((err) => {
            console.log(err)
          })
      },
      addTask() {
        console.log('add task')
      },
      addCategory() {
        console.log('add category')
      },
      showMessage(payload) {
        this.$emit('showMessage', payload)
      },
      changePage(payload) {
        console.log('changePage from home:', payload)
        this.$emit('changePage', payload)
      },
    },
  }
</script>

<style></style>

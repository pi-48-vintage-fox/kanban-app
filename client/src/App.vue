<template>
  <div>
    <!-- login -->
    <LoginPage 
      v-if="pageName == 'LoginPage'"
      @changePage="changePage"
      @loginUser="loginUser">
    </LoginPage>

    <!-- register -->
    <RegisterPage 
      v-else-if="pageName == 'RegisterPage'"
      @createAccount="registerUser">
    </RegisterPage>

    <!-- homepage -->
    <HomePage 
      v-else-if="pageName == 'HomePage'"
      :tasks="tasks"
      :category="category">
    </HomePage>

    <!-- addpage -->
    <AddPage 
      v-else-if="pageName == 'AddPage'">
    </AddPage>

    <!-- edit -->
    <EditPage 
      v-else-if="pageName == 'EditPage'">
    </EditPage>
  </div>
</template>

<script>
import LoginPage from './component/Login-Page'
import RegisterPage from './component/Register-Page'
import HomePage from './component/Home-Page'
import AddPage from './component/Add-Page'
import EditPage from './component/Edit-Page'
import axios from '../config/axios'

export default {
  name: 'App',
  data() {
    return {
      msg: 'Kanban App by Hutamy Triesthi',
      pageName: 'LoginPage',
      tasks : [],
      category : []
    }
  },
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
    AddPage,
    EditPage
  }, methods: {
    // page() {
    //   if(access_token){
    //     this.changePage('HomePage')
    //   }
    //   else{
    //     this.changePage('LoginPage')
    //   }
    // },
    changePage (name){
      this.pageName = name
    },
    fetchTasks (){
      const access_token = localStorage.getItem('access_token')
      axios({
        url: '/tasks',
        method: 'GET',
        headers: {
          access_token: access_token
        }
      })
      .then(tasks => {
        tasks.data.forEach(el => {
          this.category.push(el.Category)
        });
        this.tasks = tasks.data
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    registerUser (payload) {
      axios({
        url: '/register',
        method: 'POST',
        data : {
          name: payload.name, 
          email: payload.email,
          password: payload.password
        }
      })
      .then(user => {
        const access_token = localStorage.setItem('access_token', user.data.access_token)
        this.fetchTasks()
        this.changePage('HomePage')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    loginUser(payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      .then(user => {
        const access_token = localStorage.setItem('access_token', user.data.access_token)
        this.fetchTasks()
        this.changePage('HomePage')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addTask () {
      const access_token = localStorage.getItem('access_token')
      axios({
        url: '/tasks',
        method: 'POST',
        headers: {
          access_token
        },
        data: {
          title,
          description,
          CategoryId
        }
      })
      .then(task => {
        this.fetchTasks()
        this.changePage('HomePage')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    taskById(){
      const access_token = localStorage.getItem('access_token')
      const id = req.params.id
      axios({
        url: `/tasks/${id}`,
        method: 'GET',
        headers: {
          access_token
        }
      })
      .then(task => {

      })
      .catch(err => {
        console.log(err)
      })
    },
    editPut() {
      const access_token = localStorage.getItem('access_token')
      const id = req.params.id
      axios({
        url: `/tasks/${id}`,
        method: 'PUT',
        headers: {
          access_token
        },
        data: {
          title,
          description,
          CategoryId
        }
      })
      .then(task => {

      })
      .catch(err => {
        console.log(err)
      })
    },
    editPatch(){
      const access_token = localStorage.getItem('access_token')
      const id = req.params.id
      axios({
        url: `/tasks/${id}`,
        method: 'PATCH',
        headers: {
          access_token
        },
        data: {
          CategoryId
        }
      })
      .then(task => {

      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask () {
      const id = req.params.id
      const access_token = localStorage.getItem('access_token')
      axios({
        url: `tasks/${id}`,
        method: 'DELETE',
        headers: {
          access_token
        }
      })
      .then(data => {

      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.fetchTasks()
  }
}
</script>

<style>

</style>
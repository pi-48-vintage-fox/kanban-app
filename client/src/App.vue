<template>
  <div>
    <LoginPage 
      v-if="pageName == 'LoginPage'"
      @changePage="changePage"
      @loginUser="loginUser"
      @GoogleLogin="onSignIn">
    </LoginPage>

    <RegisterPage 
      v-else-if="pageName == 'RegisterPage'"
      @createAccount="registerUser">
    </RegisterPage>

    <HomePage 
      v-else-if="pageName == 'HomePage'"
      :tasks="tasks"
      :categories="categories"
      @changePage="changePage"
      @toEdit="toEdit"
      @toDelete="toDelete"
      @logOut="logOut"
      @fetchTasks="fetchTasks">
    </HomePage>

    <AddPage 
      v-else-if="pageName == 'AddPage'"
      :categories="categories"
      @changePage="changePage"
      @addTask="addTask"
      @logOut="logOut">
    </AddPage>

    <EditPage 
      v-else-if="pageName == 'EditPage'"
      :categories="categories"
      :detailTask="detailTask"
      @changePage="changePage"
      @editPut="editPut"
      @logOut="logOut">
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
import GoogleLogin from 'vue-google-login'

export default {
  name: 'App',
  data() {
    return {
      msg: 'Kanban App by Hutamy Triesthi',
      pageName: 'LoginPage',
      tasks : [],
      detailTask : null,
      id: 0,
      categories: []
    }
  },
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
    AddPage,
    EditPage,
    GoogleLogin
  }, methods: {

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
        this.tasks = tasks.data
        this.allCategories()
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
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
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
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
        Swal.fire('Signed in successfully')
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
      })
    },

    onSignIn(google_access_token) {
      axios({
        method: 'POST',
        url: `/googleLogin`,
        data: {
          google_access_token
        }
      })
      .then(({data}) => {
          let access_token = data.access_token
          localStorage.setItem('access_token', access_token)
          this.fetchTasks()
          this.changePage('HomePage')
          Swal.fire('Signed in successfully')
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
        this.changePage('LoginPage')
      })
    },

    allCategories() {
      const access_token = localStorage.getItem('access_token')
      axios({
        url: '/categories',
        method: 'GET',
        headers: {
          access_token
        }
      })
      .then(category => {
        this.categories = category.data
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
      })
    },

    addTask (payload) {
      const access_token = localStorage.getItem('access_token')
      this.allCategories()
      axios({
        url: '/tasks',
        method: 'POST',
        headers: {
          access_token
        },
        data: {
          title: payload.title,
          description: payload.description,
          CategoryId: payload.CategoryId
        }
      })
      .then(task => {
        this.fetchTasks()
        this.changePage('HomePage')
        Swal.fire('Sucessfully Add Task')
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
      })
    },

    toEdit (payload){
      this.detailTask = payload
      this.pageName = 'EditPage'
      this.id = payload.id
    },

    editPut(payload) {
      const access_token = localStorage.getItem('access_token')
      const id = payload.id
      axios({
        url: `/tasks/${id}`,
        method: 'PUT',
        headers: {
          access_token
        },
        data: {
          title: payload.title,
          description: payload.description,
          CategoryId: payload.CategoryId
        }
      })
      .then(task => {
        this.fetchTasks()
        this.changePage('HomePage')
        Swal.fire('Successfully Edit Task')
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
      })
    },

    toDelete(payload){
      this.deleteTask(payload.id)
    },

    deleteTask (id) {
      const access_token = localStorage.getItem('access_token')
      axios({
        url: `/tasks/${id}`,
        method: 'DELETE',
        headers: {
          access_token
        }
      })
      .then(data => {
        this.fetchTasks()
        this.changePage('HomePage')
        Swal.fire('Successfully delete task')
      })
      .catch(err => {
        Swal.fire(
          'Error!',
          err.response.data.msg,
          'ERROR'
        )
      })
    },

    logOut () {
      this.pageName = 'LoginPage'
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });  
      Swal.fire('Successfully log out')
    }
  },
  
  created() {
    const access_token = localStorage.getItem('access_token')
    if(!access_token){
      this.pageName = 'LoginPage'
    }else{
      this.pageName = 'HomePage'
      this.fetchTasks()
    }
  }
}
</script>

<style>

</style>  
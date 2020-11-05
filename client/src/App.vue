<template>
  <section class="body">
    <LandingPage 
      v-if="inPage==='landingPage'"
      @login="login"
      @register="register"
    ></LandingPage>
    <HomePage 
      v-else-if="inPage==='homePage'"
      @ready="ready"
      @getCategories="getCategories"
      @getTasks="getTasks"
      :organizations="organizations"
      :categories="categories"
      :tasks="tasks"
      :msg="msg"
    ></HomePage>
  </section>
</template>

<script>
import Swal from 'sweetalert2';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import axios from './config/axios';
export default {
  name: 'App',
  data() {
    return {
      msg: '',
      categories: '',
      inPage: 'landingPage',
      organizations: '',
      server: 'http://localhost:1234',
      tasks: ''
    };
  },
  components: {
    HomePage,
    LandingPage
  },
  methods: {
    changePage(page) {
      this.inPage = page
    },
    changeCategory(res) {
      axios({
        method: 'PATCH',
        url: '/tasks/' + res[1],
        headers: {
          token: localStorage.getItem("token")
          },
        data: {
          category: res[0]
        }
      })
        .then(result => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOrganizations() {
      axios({
        method: 'GET',
        url: '/organizations'
      })
        .then(result => {
          this.organizations = result.data;
          
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCategories(orgId) {
      axios({
        method: 'GET',
        url: '/categories/' + orgId,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          let categoriesNames = result.data.map(element => {
            return element.name
          })
          this.categories = categoriesNames;
          this.getTasks(orgId);
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          this.categories='';
        })
    },
    getTasks(orgId) {
      axios({
        method: 'GET',
        url: '/tasks/' + orgId,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.tasks = result.data
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    login(payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          this.changePage('homePage');
          // this.getOrganizations();
        })
        .catch(err => {
          console.log(err)
        })
    },
    register(payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(result => {
          this.changePage('landingPage')
        })
        .catch(err => {
          console.log(err)
        })
    },
    ready() {
      if(localStorage.getItem("token")) {
        this.inPage = 'homePage';
        this.getOrganizations();
      } else {
        this.inPage = 'landingPage'
      }
    }
  },
  created() {
    this.ready();
  }
};
</script>

<style>
</style>
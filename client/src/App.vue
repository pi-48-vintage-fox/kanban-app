<template>
  <div>
    <!-- LOGIN PAGE -->
    <Login v-if="currentPage == 'login-page'"></Login>

    <!-- REGISTRATION PAGE -->
    <Register v-else-if="currentPage == 'reg-page'"></Register>

    <!-- HOMEPAGE -->
    <HomePage 
    v-else-if="currentPage == 'homepage'"
    :categories="categoryHead">
    </HomePage>
  </div>
</template>

<script>
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import axios from './config/axios'

export default {
  name: 'App',
  data() {
    return {
      message: "Hello world",
      currentPage: "homepage",
      categoryHead: [
        {
          name: 'Backlog'
        },
        {
          name: 'Todo'
        },
        {
          name: 'Doing'
        },
        {
          name: 'Done'
        }
      ]
    };
  },
  components: {
    HomePage,
    Register,
    Login
  }
};
</script>

<style scoped>
</style>
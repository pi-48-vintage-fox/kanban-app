<template>
  <div>
    <!-- LOGIN PAGE -->
    <Login v-if="currentPage == 'login-page'" @changePage="changePage"></Login>

    <!-- REGISTRATION PAGE -->
    <Register v-else-if="currentPage == 'reg-page'" @changePage="changePage"></Register>

    <!-- HOMEPAGE -->
    <HomePage
      v-else-if="currentPage == 'homepage'"
      :categories="categoryHead"
      @changePage="changePage"
    >
    </HomePage>
  </div>
</template>

<script>
import HomePage from "./components/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      message: "Hello world",
      currentPage: "login-page",
      categoryHead: [
        {
          name: "Backlog",
        },
        {
          name: "Todo",
        },
        {
          name: "Doing",
        },
        {
          name: "Done",
        },
      ],
      tasks: [],
    };
  },
  components: {
    HomePage,
    Register,
    Login,
  },
  methods: {
    changePage(name) {
      this.currentPage = name;
    },
  },
  created() {
    if(localStorage.access_token) {
      this.currentPage = 'homepage'
    }
    else {
      this.currentPage = 'login-page'
    }
  },
};
</script>

<style scoped>
</style>
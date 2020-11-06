<template>
  <div>
    <!-- LOGIN PAGE -->
    <Login v-if="currentPage == 'login-page'"></Login>

    <!-- REGISTRATION PAGE -->
    <Register v-else-if="currentPage == 'reg-page'"></Register>

    <!-- HOMEPAGE -->
    <HomePage
      v-else-if="currentPage == 'homepage'"
      :categories="categoryHead"
      :tasks="tasks"
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
      currentPage: "homepage",
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
    fetchTasks() {
      axios({
        url: "/tasks",
        method: "GET",
        // headers: {

        // }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
</style>
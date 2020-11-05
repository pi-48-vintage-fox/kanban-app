<template>
  <section>
    <loginPage v-if="pageName == 'login-page'"></loginPage>
    <homePage
      v-else-if="pageName == 'home-page'"
      :cates="categories"
      :tasks="tasks"
      @changePage="changePage"
    >
    </homePage>
  </section>
</template>

<script>
import loginPage from "./components/loginPage";
import homePage from "./components/homePage";
import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      msg: "Hello World",
      pageName: "home-page",
      categories: [
        {
          category: "Backlog",
        },
        {
          category: "To Do",
        },
        {
          category: "Doing",
        },
        {
          category: "Done",
        },
      ],
      tasks: [],
    };
  },
  components: {
    loginPage,
    homePage,
  },
  methods: {
    changePage(name){
      this.pageName = name
    },
    fetchTask() {
      axios({
        url: "/task",
        method: "GET",
        // headers:{localStorage.access_token}
      })
        .then(({ data }) => {
          console.log(data);
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  created() {
    this.fetchTask();
  },
};
</script>

<style scoped>
</style>
<template>
  <section>
    <loginPage v-if="pageName=='login-page'" @changePage ='changePage'></loginPage>
    <homePage
      v-else-if="pageName == 'home-page'"
      :cates="categories"
      :tasks="tasks"
      @changePage="changePage"
    >
    </homePage>
    <registerPage v-else-if="pageName =='register-page'" @changePage="changePage"></registerPage>
  </section>
</template>

<script>
import loginPage from "./components/loginPage";
import homePage from "./components/homePage";
import registerPage from "./components/registerPage";
import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      msg: "Hello World",
      pageName: "login-page",
      isLogin:"false",
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
    registerPage
  },
  methods: {
    changePage(name){
      this.pageName = name
    },
    fetchTask() {
      axios({
        url: "/task",
        method: "GET",
        headers:localStorage.getItem('access_token',access_token)
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
    let access_token = localStorage.getItem('access_token')
    if(access_token){
      this.pageName = 'home-page'
      this.isLogin = true
      this.fetchTask();
    }else{
      this.pageName = 'login-page'
      this.isLogin = false
    }
  },
};
</script>

<style scoped>
</style>
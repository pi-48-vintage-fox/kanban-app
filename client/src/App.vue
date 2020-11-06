<template>
  <div>
    <!-- navbar -->
    <!-- Mobile Navigation Bar -->
    <!-- <NavPage v-if="pageName === 'nav-page'"></NavPage> -->
    <div class="topnav">
      <a
        href="javascript:void(0);"
        class="active col-xl"
        onclick="myFunction()"
      >
        <i href="#home" class="active fab fa-korvue fa-lg"> Kanban</i>
      </a>
      <div id="myLinks">
        <a href="#">New Task</a>
        <a href="#">Register</a>
        <a href="#">Login</a>
        <a href="#">Logout</a>
      </div>
    </div>

    <!-- kanban board -->
    <HomePage v-if="pageName === 'home-page'" :categories="dataTask"></HomePage>

    <!-- login -->
    <LoginPage v-else-if="pageName === 'login-page'"></LoginPage>

    <!-- register -->
    <RegisterPage v-else-if="pageName === 'register-page'"></RegisterPage>

    <!-- add form -->
    <AddPage v-else-if="pageName === 'add-page'"></AddPage>

    <!-- edit form -->
    <EditPage v-else-if="pageName === 'edit-page'"></EditPage>
  </div>
</template>

<script>
import HomePage from "./components/HomePage";
import AddPage from "./components/AddPage";
import EditPage from "./components/EditPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavPage from "./components/NavPage";
import axios from "../config/axios";
export default {
  name: "App",
  data() {
    return {
      msg: "test vue",
      pageName: "home-page",
      dataTask: [],
    };
  },
  components: {
    HomePage,
    AddPage,
    EditPage,
    LoginPage,
    RegisterPage,
    NavPage,
  },
  methods: {
    fetchTask() {
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwiaWF0IjoxNjA0NjU5MDU2fQ.t-wJGh8l-bbTITqBsa_nGnfaqNGaZbw5o5Yj_KGIdHc",
        },
      })
        .then(({ data }) => {
          this.dataTask = data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
  created() {
    this.fetchTask();
  },
};
</script>

<style>
</style>
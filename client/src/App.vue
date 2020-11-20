<template>
  <HomePage
    v-if="pageName == 'home-page'"
    @add="add"
    @logout="logout"
    :categories="categories"
    :tasks="tasks"
    @move="move"
    @deleteTask="deleteTask"
    @editTask="editTask"
  >
  </HomePage>
  <LoginPage
    v-else-if="pageName == 'login-page'"
    @login="login"
    @register="register"
    @GoogleLogin="GoogleLogin"
  >
  </LoginPage>
</template>

<script>
import GoogleLogin from "vue-google-login";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      pageName: "login-page",
      tasks: [],
      categories: [],
    };
  },
  components: {
    HomePage,
    LoginPage,
  },
  methods: {
    login(payload) {
      axios({
        url: "/login",
        method: "POST",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((data) => {
          console.log(data);
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("name", data.data.name);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Succes",
            showConfirmButton: false,
            timer: 1500,
          });
          this.pageName = "home-page";
          this.showTask();
          this.fetchCategories();
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    register(payload) {
      axios({
        url: "/register",
        method: "POST",
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        },
      })
        .then((data) => {
          console.log(data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Register Success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.pageName = "login-page";
            localStorage.clear();
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log("User signed out.");
            });
            Swal.fire("Good Bye!", "Thanks for Coming.", "-Adrian-");
          }
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    add(payload) {
      axios({
        url: "/tasks",
        method: "POST",
        data: {
          title: payload.title,
          description: payload.description,
          category: payload.category,
          UserId: payload.UserId,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          this.showTask();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    showTask() {
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .category((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    fetchCategories() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/categories",
        method: "GET",
        headers: {
          access_token: token,
        },
      })
        .then((result) => {
          console.log(result);
          this.categories = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    move(payload) {
      axios({
        url: `/tasks/${payload.id}`,
        method: "PATCH",
        data: {
          CategoryId: payload.CategoryId,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task has been moved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showTask();
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    deleteTask(payload) {
      axios({
        url: `/tasks/${payload.id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          this.showTask();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task has been deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    editTask(payload) {
      axios({
        url: `/tasks/${payload.id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: payload.title,
          description: payload.description,
        },
      })
        .then((data) => {
          this.showTask();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your task has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire(err.response.data.message);
        });
    },
    GoogleLogin(payload) {
      axios({
        url: `/google-login`,
        method: "POST",
        data: {
          name: payload.name,
          google_access_token: payload.google_access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("id", data.userId);
          localStorage.setItem("name", data.name);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Succes",
            showConfirmButton: false,
            timer: 1500,
          });
          this.pageName = "home-page";
          this.showTask();
          this.fetchCategories();
        })
        .catch((err) => {
          // console.log(err);
          Swal.fire(err.response.data.message);
        });
    },
  },
  created() {
    this.fetchCategories();
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
      this.pageName = "login-page";
    } else {
      this.pageName = "home-page";
      this.showTask();
    }
  },
};
</script>

<style>
</style>
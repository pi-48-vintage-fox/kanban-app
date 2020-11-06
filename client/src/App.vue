<template>
  <section class="body">
    <LandingPage
      v-if="inPage === 'landingPage'"
      @login="login"
      @register="register"
      @googleLogin="googleLogin"
    ></LandingPage>
    <HomePage
      v-else-if="inPage === 'homePage'"
      @addCategory="addCategory"
      @addTask="addTask"
      @deleteCategory="deleteCategory"
      @deleteTask="deleteTask"
      @ready="ready"
      @getCategories="getCategories"
      @getTasks="getTasks"
      @editTask="editTask"
      @emptyCategories="emptyCategories"
      @moveTask="moveTask"
      @orgYetChosed="orgYetChosed"
      :categoriesObj="categoriesObj"
      :organizations="organizations"
      :categories="categories"
      :tasks="tasks"
      :orgChosed="orgChosed"
    ></HomePage>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      connection: null,
      orgChosed: false,
      categories: "",
      inPage: "landingPage",
      organizations: "",
      server: "http://localhost:1234",
      tasks: "",
      categoriesObj: "",
    };
  },
  components: {
    HomePage,
    LandingPage,
  },
  methods: {
    addCategory(payload) {
      axios({
        method: "POST",
        url: "categories/" + payload[1],
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          name: payload[0],
        },
      })
        .then((result) => {
          this.ready();
          this.getCategories(payload[1]);
        })
        .catch((err) => {
          console.log("error");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        });
    },
    addTask(payload) {
      const { title, category, OrganizationId } = payload;
      axios({
        method: "POST",
        url: "/tasks",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          title,
          category,
          OrganizationId,
        },
      })
        .then((result) => {
          this.ready();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        });
    },
    changePage(page) {
      this.inPage = page;
    },
    deleteCategory(categload) {
      console.log(categload);
      axios({
        method: "DELETE",
        url: "categories/" + categload[1] + "/" + categload[0],
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((result) => {
          this.ready();
          this.getCategories(categload[1]);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        });
    },
    deleteTask(id) {
      axios({
        method: "DELETE",
        url: "/tasks/" + id,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((result) => {
          this.ready();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The task isn't yours",
          });
        });
    },
    editTask(payload) {
      axios({
        method: "PUT",
        url: "tasks/" + payload.id,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          title: payload.title,
          category: payload.category,
        },
      })
        .then((result) => {
          this.ready();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `The task isn't yours`,
          });
          console.log(err);
        });
    },
    emptyCategories() {
      this.categories = "";
    },
    getOrganizations() {
      axios({
        method: "GET",
        url: "/organizations",
      })
        .then((result) => {
          this.organizations = result.data;
          this.getTasks();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategories(orgId) {
      axios({
        method: "GET",
        url: "/categories/" + orgId,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((result) => {
          let categoriesNames = result.data.map((element) => {
            return element.name;
          });
          this.orgChosed = true;
          this.categories = categoriesNames;
          this.categoriesObj = result.data;
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
          this.orgChosed = false;
          this.categories = "";
          this.orgYetChosed();
        });
    },
    getTasks(orgId) {
      axios({
        method: "GET",
        url: "/tasks",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((result) => {
          this.tasks = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    googleLogin(idToken) {
      console.log(idToken);
      axios({
        method: "POST",
        url: "/googleLogin",
        data: {
          google_access_token: idToken,
        },
      })
        .then((result) => {
          console.log(result);
          localStorage.setItem("token", result.data.token);
          this.ready();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login(payload) {
      axios({
        method: "POST",
        url: "/login",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          this.ready();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
          console.log(err);
        });
    },
    moveTask(payload) {
      axios({
        method: "PATCH",
        url: "tasks/" + payload.id,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          category: payload.category,
        },
      })
        .then((result) => {
          this.ready();
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The task isn't yours",
          });
        });
    },
    orgYetChosed() {
      this.orgChosed = false;
    },
    register(payload) {
      axios({
        method: "POST",
        url: "/register",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          this.changePage("landingPage");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
          console.log(err);
        });
    },
    ready() {
      if (localStorage.getItem("token")) {
        this.inPage = "homePage";
        this.getOrganizations();
      } else {
        this.inPage = "landingPage";
      }
    },
  },
  created() {
    this.ready();
    console.log("Starting Connection to WebSocket Server");
    this.connection = new WebSocket("wss://echo.websocket.org");

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo WebSocket Server");
    };

    this.connection.onmessage = function (event) {
      console.log(event);
    };
  },
};
</script>

<style>
</style>
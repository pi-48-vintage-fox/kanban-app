<template>
  <div>
    <transition name="fade" mode="out-in">
      <LoginPage
        v-if="currentView == 'Login'"
        @login="login"
        @changePage="changePage"
      ></LoginPage>

      <RegisterPage
        v-if="currentView == 'Register'"
        @register="register"
        @changePage="changePage"
      ></RegisterPage>

      <MainPage
        v-if="currentView == 'Main'"
        @logout="logout"
        :tasks="tasks"
      ></MainPage>
    </transition>
  </div>
</template>

<script>
import LoginPage from "./components/login-page";
import RegisterPage from "./components/register-page";
import MainPage from "./components/main-page";
import axios from "./config/axios";

export default {
  name: "App",
  data() {
    return {
      currentView: "Login",
      access_token: "",
      tasks:{},
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    MainPage,
  },
  methods: {
    changePage(payload) {
      this.currentView = payload.page;
    },
    register(payload) {
      this.$vToastify.loader("Please wait ..");
      setTimeout(() => {
        axios
          .post("/register", payload)
          .then((response) => {
            this.$vToastify.stopLoader();
            this.$vToastify.success("Success!");
            console.log(response);
            localStorage.setItem("access_token", response.data.access_token);
            this.currentView = "Main";
          })
          .catch((err) => {
            this.$vToastify.stopLoader();
            this.$vToastify.error(err.response.data.msg, "Ooops");
          });
      }, 500);
    },
    logout() {
      this.$vToastify.loader("Logging out ..");
      setTimeout(() => {
        let access_token = localStorage.clear();
        this.$vToastify.stopLoader();
        this.$vToastify.success(":(", "Bye");
        this.currentView = "Login";
      }, 500);
    },
    login(payload) {
      this.$vToastify.loader("Logging in ..");
      setTimeout(() => {
        axios
          .post("/login", payload)
          .then((response) => {
            this.$vToastify.stopLoader();
            this.$vToastify.success("Logged In!");
            this.currentView = "Main";
            console.log(response);
            localStorage.setItem("access_token", response.data.access_token);
          })
          .catch((err) => {
            this.$vToastify.stopLoader();
            this.$vToastify.error(err.response.data.msg, "Ooops");
          });
      }, 500);
    },

    fetchTask() {
      axios
        .get("/tasks", {
          headers: {
            access_token: this.access_token,
          },
        })
        .then((response) => {
          console.log(response);
          this.tasks = response.data.tasks;
        })
        .catch((err) => {
          this.$vToastify.error(err.response.data.msg, "Ooops");
        });
    },
  },
  mounted() {
    this.fetchTask();
  },
  created() {
    let access_token = localStorage.getItem("access_token");
    if (!access_token) {
      this.currentView = "Login";
    } else {
      this.currentView = "Main";
      this.access_token = access_token;
    }
  },
};
</script>
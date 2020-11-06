<template>
  <div>
    <transition name="fade" mode="out-in">
      <LoginPage
        v-if="currentView == 'Login'"
        @login="login"
        @changePage="changePage"
        @oauthLoginSuccess="oauthLogin"
      ></LoginPage>

      <RegisterPage
        v-if="currentView == 'Register'"
        @register="register"
        @changePage="changePage"
      ></RegisterPage>

      <MainPage
        v-if="currentView == 'Main'"
        :tasks="tasks"
        @logout="logout"
        @addNewTask="addNewTask"
        @newCategory="addNewCategory"
        @editTask="editTask"
        @deleteTask="deleteTask"
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
      tasks: {},
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    MainPage,
  },
  sockets: {
    connect() {
      console.log("connected");
    },
    onLoggedIn() {
      console.log("loggedIn");
    },
    messageChannel(data) {
      console.log(data);
    },
    tasksUpdated(data) {
      console.log("taskUpdated");
      this.tasks = data;
    },
    broadcast(data) {
      console.log(data);
    },
    notAuthenticated(data) {
      this.currentView = "Login";
      this.$vToastify.error("Not Loggin", "Oops..");
    },
  },
  methods: {
    oauthLogin(payload) {
      axios
        .post("/oauth", {
          data: {
            token: payload.token,
          },
        })
        .then((response) => {
          console.log(response);
          this.$vToastify.success("Logged in");
          localStorage.setItem("access_token", response.data.access_token);
          this.currentView = "Main";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    updateTask() {
      console.log(this);
      this.$socket.client.emit("updateTask", {
        access_token: localStorage.access_token,
      });
    },
    deleteTask(payload) {
      axios
        .delete("/tasks/" + payload.taskId, {
          headers: {
            access_token: this.access_token,
          },
        })
        .then((response) => {
          this.$vToastify.success("Task Deleted");
          this.updateTask();
        })
        .catch((err) => {
          this.$vToastify.error(err.response.data.msg, "Ooops..");
        });
    },
    editTask(payload) {
      axios
        .put(
          "/tasks/" + payload.taskId,
          {
            title: payload.content,
            CategoryId: payload.CategoryId,
          },
          {
            headers: {
              access_token: this.access_token,
            },
          }
        )
        .then((response) => {
          this.$vToastify.success("Task Edited");
          this.updateTask();
        })
        .catch((err) => {
          this.$vToastify.error(err.response.data.msg, "Ooops");
        });
    },
    addNewCategory(payload) {
      axios
        .post("/categories", payload, {
          headers: {
            access_token: this.access_token,
          },
        })
        .then((response) => {
          this.$vToastify.success("Category Created");
          this.updateTask();
        })
        .catch((err) => {
          this.$vToastify.error(err.response.data.msg, "Ooops");
        });
    },
    addNewTask(payload) {
      axios
        .post("/tasks", payload, {
          headers: {
            access_token: this.access_token,
          },
        })
        .then((response) => {
          this.$vToastify.success("Task Created");
          this.updateTask();
        })
        .catch((err) => {
          this.$vToastify.error(err.response.data.msg, "Ooops");
        });
    },
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
            localStorage.setItem("access_token", response.data.access_token);
          })
          .catch((err) => {
            this.$vToastify.stopLoader();
            this.$vToastify.error(err.response.data.msg, "Ooops");
          });
      }, 500);
    },
  },
  mounted() {},
  created() {
    let access_token = localStorage.access_token;
    if (!access_token) {
      this.currentView = "Login";
    } else {
      this.currentView = "Main";
      this.access_token = access_token;
      this.updateTask();
    }
  },
};
</script>
<template>
  <div>
    <Navbar :page="page" @changePage="changePage"></Navbar>
    <LoginForm
      v-if="page === 'login'"
      @login="login"
      @googleLogin="googleLogin"
    ></LoginForm>
    <RegisterForm
      v-if="page === 'register'"
      @register="register"
    ></RegisterForm>
    <Tasks
      v-if="page === 'tasks'"
      :tasks="tasks"
      @addTask="addTask"
      @editTask="editTask"
      @editCategory="editCategory"
      @deleteTask="deleteTask"
    ></Tasks>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import RegisterForm from "./views/RegisterForm";
import LoginForm from "./views/LoginForm";
import Tasks from "./views/Tasks";
import Axios from "axios";
export default {
  name: "App",
  components: {
    Navbar,
    RegisterForm,
    LoginForm,
    Tasks,
  },
  data() {
    return {
      page: "login",
      tasks: [],
    };
  },
  methods: {
    register(payload) {
      Axios.post("http://localhost:3000/register", {
        email: payload.email,
        password: payload.password,
      })
        .then(({ data }) => {
          this.page = "login";
        })
        .catch(({ err }) => {
          console.log(err.message);
        });
    },
    login(payload) {
      Axios.post("http://localhost:3000/login", {
        email: payload.email,
        password: payload.password,
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          this.page = "tasks";
          this.fetchTasks();
        })
        .catch(({ err }) => {
          console.log(err);
        });
    },
    googleLogin() {
      this.page = "tasks";
      this.fetchTasks();
    },
    fetchTasks() {
      Axios.get("http://localhost:3000/task", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(({ err }) => {
          console.log(err);
        });
    },
    addTask(value) {
      Axios.post(
        "http://localhost:3000/task",
        {
          title: value.title,
          description: value.description,
          category: value.category,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
        .then(({ data }) => {
          this.fetchTasks();
        })
        .catch(({ err }) => {
          console.log(err);
        });
    },
    editTask(value) {
      Axios.put(
        `http://localhost:3000/task/${value.id}`,
        {
          title: value.title,
          description: value.description,
          category: value.category,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
        .then(({ data }) => {
          this.fetchTasks();
        })
        .catch(({ err }) => {
          this.fetchTasks();
          console.log(err);
        });
    },
    editCategory(value) {
      Axios.patch(
        `http://localhost:3000/task/${value.id}`,
        {
          category: value.category,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
        .then(({ data }) => {
          this.fetchTasks();
        })
        .catch(({ err }) => {
          this.fetchTasks();
          console.log("err");
        });
    },
    deleteTask(value) {
      console.log(value);
      Axios.delete(`http://localhost:3000/task/${value}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.fetchTasks();
        })
        .catch(({ err }) => {
          this.fetchTasks();
          console.log("err");
        });
    },
    changePage(value) {
      this.page = value;
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.page = "tasks";
      this.fetchTasks();
    } else {
      this.page = "login";
    }
  },
};
</script>

<style scoped>
</style>
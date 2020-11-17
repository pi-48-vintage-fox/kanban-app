<template>
  <div>
    <!-- kanban board/home -->
    <HomePage
      v-if="pageName === 'home-page'"
      :task="task"
      :categories="categories"
      @changePage="changePage"
      @deleteTask="deleteTask"
      @kirimTaskUntukEdit="editTask"
    ></HomePage>

    <!-- login -->
    <LoginPage
      v-else-if="pageName === 'login-page'"
      @login="login"
      @changePage="changePage"
    ></LoginPage>

    <!-- register -->
    <RegisterPage
      v-else-if="pageName === 'register-page'"
      @register="register"
    ></RegisterPage>

    <!-- add form -->
    <AddPage v-else-if="pageName === 'add-page'" @add="add"></AddPage>

    <!-- edit form -->
    <EditPage
      v-else-if="pageName === 'edit-page'"
      :taskUntukEdit="taskUntukEdit"
      :categories="categories"
      @editPage="editPage"
    ></EditPage>
  </div>
</template>

<script>
import HomePage from "./components/HomePage";
import AddPage from "./components/AddPage";
import EditPage from "./components/EditPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import axios from "../config/axios";

export default {
  name: "App",
  data() {
    return {
      msg: "test vue",
      pageName: "login-page",
      task: [],
      categories: [],
      taskUntukEdit: {},
    };
  },
  components: {
    HomePage,
    AddPage,
    EditPage,
    LoginPage,
    RegisterPage,
  },
  methods: {
    changePage(payload) {
      console.log(payload);
      this.pageName = payload;
    },

    fetchTask() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          token,
        },
      })
        .then((data) => {
          console.log(data, "<<< ini data task kanban");
          this.task = data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },

    fetchCategory() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/category",
        method: "GET",
        headers: {
          token,
        },
      })
        .then((result) => {
          console.log(result.data.data, "<<< ini category dari dari app.vue");
          this.categories = result.data.data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },

    add(payload) {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "POST",
        headers: {
          token,
        },
        data: {
          title: payload.title,
        },
      })
        .then((data) => {
          this.fetchTask();
          this.fetchCategory();
          this.pageName = "home-page";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editTask(payload) {
      console.log(payload, "<<< ini adalah task yg diterima dari komponen");
      this.taskUntukEdit = payload;
      this.pageName = "edit-page";
      // const token = localStorage.getItem("access_token");
      // axios({
      //   url: "/tasks" + payload.id,
      //   method: "PUT",
      //   headers: {
      //     token,
      //   },
      //   data: {
      //     title: payload.title,
      //   },
      // })
      //   .then((data) => {
      //     this.fetchTask();
      //     this.fetchCategory();
      //     this.pageName = "home-page";
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

    editPage(payload) {
      axios({
        url: "/",
      });
    },

    deleteTask(id) {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks" + id,
        method: "DELETE",
        headers: {
          token,
        },
        data: {
          title: payload.title,
        },
      })
        .then((data) => {
          this.pageName = "home-page";
          this.fetchTask();
          this.fetchCategory();
          console.log("delete sukses");
        })
        .catch((err) => {
          console.log(err);
          console.log("delete gagal");
        });
    },

    login(payload) {
      axios({
        url: "/login",
        method: "POST",
        data: {
          email: payload.email,
          password: payload.password,
        },
      }).then((result) => {
        localStorage.setItem("access_token", result.data.access_token);
        this.pageName = "home-page";
        this.fetchTask();
        this.fetchCategory();
      });
    },

    register(payload) {
      axios({
        url: "/register",
        method: "POST",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          console.log(result);
          this.pageName = "login-page";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    if (localStorage.getItem("access_token")) {
      this.pageName = "home-page";
      this.fetchTask();
      this.fetchCategory();
    } else {
      this.pageName = "login-page";
    }
  },
};
</script>

<style>
</style>
<template>
  <div>
    <!-- kanban board/home -->
    <HomePage
      v-if="pageName === 'home-page'"
      :task="task"
      :categories="categories"
      @deleteTasks="deleteTasks"
      @moveCategory="moveCategory"
      @kirimTaskUntukEdit="editTask"
      @changePage="changePage"
    ></HomePage>

    <!-- login -->
    <LoginPage
      v-else-if="pageName === 'login-page'"
      @login="login"
      @GoogleLogin="onSignIn"
      @changePage="changePage"
    ></LoginPage>

    <!-- register -->
    <RegisterPage
      v-else-if="pageName === 'register-page'"
      @register="register"
      @changePage="changePage"
    ></RegisterPage>

    <!-- add form -->
    <AddPage
      v-else-if="pageName === 'add-page'"
      @addPage="addPage"
      @changePage="changePage"
    ></AddPage>

    <!-- edit form -->
    <EditPage
      v-else-if="pageName === 'edit-page'"
      :taskUntukEdit="taskUntukEdit"
      :categories="categories"
      @editPage="editPage"
      @changePage="changePage"
    ></EditPage>

    <!-- edit category -->
    <EditCategory
      v-else-if="pageName === 'edit-category'"
      :categories="categories"
      :taskId="taskId"
      @changePage="changePage"
      @changeCategory="changeCategory"
    ></EditCategory>
  </div>
</template>

<script>
import HomePage from "./components/HomePage";
import AddPage from "./components/AddPage";
import EditCategory from "./components/EditCategory";
import EditPage from "./components/EditPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import axios from "../config/axios";

export default {
  name: "App",
  data() {
    return {
      pageName: "login-page",
      task: [],
      categories: [],
      taskUntukEdit: {},
      taskId: ''
    };
  },
  components: {
    HomePage,
    AddPage,
    EditPage,
    EditCategory,
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
          this.categories = result.data.data;
        })
        .catch((err) => {
          console.log({ err });
        });
    },

    addPage(payload) {
      console.log(payload, "ININIH dari app vue data dari add page");
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "POST",
        headers: {
          token,
        },
        data: {
          title: payload.title,
          tag: payload.tag,
          category: payload.category,
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
    },

    editPage(payload) {
      console.log(payload, "<<< di app vue data payload dari edit page");
      const token = localStorage.getItem("access_token");
    },

    moveCategory(id) {
      console.log(id, "bawa CategoryId ke app dot vue");
      this.pageName = 'edit-category'
      this.taskId = id
    },

    changeCategory(payload) {
      console.log(payload, "<<<<<<<< ini payload dari app dot vue");
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks/" + payload.taskId,
        method: "PATCH",
        headers: {
          token,
        },
        data: {
          CategoryId: payload.categoryId,
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

    deleteTasks(id) {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks/" + id,
        method: "DELETE",
        headers: {
          token,
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
          this.pageName = "login-page";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  onSignIn(google_access_token) {
    console.log('masuk sini ga');
    axios({
      method: 'POST',
      url: "/googlelogin",
      data: {
        google_access_token
      }
    })
      .then(({ result }) => {
        let access_token = result.access_token
        localStorage.setItem("access_token", result.data.access_token);
        this.pageName = "home-page";
        this.fetchTask()
        this.fetchCategory()
      })
  },

  logOut() {
    this.pageName = 'login-page'
    localStorage.clear()
    var auth2 = gap.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out');
    })
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
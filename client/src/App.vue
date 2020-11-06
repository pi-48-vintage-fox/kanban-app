<template>
  <section id="early-page">
    <LoginPage v-if="isPage === 'login-page'" :login="login"></LoginPage>
    <RegisterPage v-else-if="isPage === 'add-page'"></RegisterPage>
    <KanbanHome
      @changePage="changePage"
      @fetchTasks="fetchKanban"
      v-else-if="isPage === 'kanban-homepage'"
      :categories="categories"
      :tasks="tasks"
      
    >
    </KanbanHome>
  </section>
</template>

<script>
import axios from "./config/axios";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import KanbanHome from "./components/KanbanHome";
export default {
  name: "App",
  data() {
    return {
      isPage: "login-page",
      tasks: [],
      categories: [],
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    KanbanHome,
  },
  methods: {
    changePage(payload) {
      this.isPage = payload;
      console.log("masuk sini");
    },

    login(payload) {
      axios({
        url: "/login",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.isPage = "kanban-homepage";
          this.fetchKanban();
          this.fetchCategories();
        })
        .catch((err) => {
          console.log(err.response, "<<<<< ini data error login");
        });
    },

    fetchKanban() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "get",
        headers: {
          access_token: token,
        },
      })
        .then((result) => {
          console.log(result, "<<<<< ini result kanban");
          this.tasks = result.data;
        })
        .catch((err) => {
          console.log(err, "<<<< ini error fetch");
        });
    },

    fetchCategories() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/categories",
        method: "get",
        headers: {
          access_token: token,
        },
      })
        .then((result) => {
          console.log(result, "<<<<< ini result categori");
          this.categories = result.data;
        })
        .catch((err) => {
          console.log(err, "<<<< ini error fetch kategori");
        });
    },

    deleteTask(id) {
      const token = localStorage.getItem("access_token");
      axios({
        url: `/delete/${id}`,
        method: "delete",
        headers: {
          access_token: token,
        },
      })
        .then((result) => {
          console.log("ini delete data");
        })
        .catch((err) => {
          console.log(err, "<<<< ini error di delete");
        });
    },

    editTask(id){
      const token = localStorage.getItem("access_token");
    }


  },

  created() {
    if (localStorage.getItem("access_token")) {
      this.isPage = "kanban-homepage";
      this.fetchKanban();
      this.fetchCategories();
    } else {
      this.isPage = "login-page";
    }
  },
};
</script>

<style>
</style>
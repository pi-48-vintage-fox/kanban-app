<template>
  <div>
    <!-- Landing Page -->
    <Login v-if="pageName === 'login-page'"></Login>

    <!-- Register Page -->
    <Register v-else-if="pageName === 'register-page'"></Register>

    <!-- Main Page -->
    <HomePage
      v-else-if="pageName === 'home-page'"
      :tasks="tasks"
      @changePage="changePage"
      @toEditPage="toEditPage"
      @toEditCategory="toEditCategory"
      @toDelete="toDelete">
    </HomePage>

    <!-- Add Page -->
    <AddPage v-else-if="pageName === 'add-page'" @addTasks="addTasks">
    </AddPage>

    <!-- Edit Page -->
    <EditPage
      v-else-if="pageName === 'edit-page'"
      @toEditPage="toEditPage"
      @editTasks="editTasks">
    </EditPage>

    <!-- Edit Category -->
    <EditCategory
    v-else-if="pageName === 'edit-category'"
    @toEditCategory="toEditCategory"
    @editCategory="editCategory">      
    </EditCategory>


  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import Login from "./components/Login";
import Register from "./components/Register";
import AddPage from "./components/addPage";
import EditPage from "./components/editPage";
import EditCategory from "./components/EditCategory";
import axios from "./config/axios";
export default {
  name: "App",
  data() {
    return {
      msg: "hello world",
      pageName: "home-page",
      tasks: [],
      id: 0,
    };
  },
  components: {
    HomePage,
    Login,
    Register,
    AddPage,
    EditPage,
    EditCategory
  },
  methods: {
    changePage(payload) {
      this.pageName = payload.name;
    },

    toDelete(payload) {
      console.log('ini tombol delete')
    },

    toEditPage(payload) {
      this.pageName = payload.name;
      this.id = payload.id;
    },

    toEditCategory(payload) {
      this.pageName = 'edit-category';
      this.id = payload.id
    },

    editCategory(payload){
       const token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${this.id}`,
        method: "PATCH",
        headers: {
          access_token: token,
        },
        data: {
          CategoryId: payload.category,
        },
      })
        .then((data) => {
          this.pageName = "home-page";
          this.fetchKanban();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editTasks(payload) {
      const token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${this.id}`,
        method: "PUT",
        headers: {
          access_token: token,
        },
        data: {
          title: payload.title,
          description: payload.description,
        },
      })
        .then((data) => {
          this.pageName = "home-page";
          this.fetchKanban();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchKanban() {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token: token,
        },
      })
        .then((data) => {
          console.log(data);
          this.tasks = data.data;
        })
        .catch((err) => {
          console.log(err.response, "<<<<<<< ini data error fetch");
        });
    },

    addTasks(payload) {
      const token = localStorage.getItem("access_token");
      axios({
        url: "/tasks",
        method: "POST",
        headers: {
          access_token: token,
        },
        data: {
          title: payload.title,
          description: payload.description,
        },
      })
        .then((data) => {
          this.pageName = "home-page";
          this.fetchKanban();
        })
        .catch((err) => {
          console.log(err.response, "<<<<<<< ini data error add");
        });
    },
  },
  created() {
    this.fetchKanban();
  },
};
</script>

<style>
</style>
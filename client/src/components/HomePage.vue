<template>
  <section id="homepage">
    <nav class="navbar navbar-expand-lg navbar-light bg-custom-tp">
      <a class="navbar-brand" href="#" @click="page = 'default'">KanBar</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#" @click="page = 'add-task'">Add Task</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button
          class="btn btn-outline-dark my-2 my-sm-0"
          type="submit"
          @click="logout"
        >
          Log out
        </button>
      </form>
    </nav>
    <div v-if="page == 'default'" id="content-section" class="container">
      <div class="row mt-4 mb-4">
        <Category
          v-for="(cat, i) in categories"
          :key="i"
          :categoryTitle="cat"
          :tasks="tasks"
          :fetchTaskCat="fetchTasks"
        ></Category>
      </div>
    </div>
    <AddTask
      v-else-if="page == 'add-task'"
      @hp-change="hpChange"
      :fetchTaskProps="fetchTasks"
    ></AddTask>
    <EditTask v-else-if="page == 'edit-task'" @hp-change="hpChange"></EditTask>
  </section>
</template>

<script>
import Category from "./Category";
import axios from "../config/axios";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
export default {
  name: "HomePage",
  data() {
    return {
      page: "default",
      tasks: [],
    };
  },
  methods: {
    fetchTasks() {
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
        .catch((err) => {
          console.log(err);
        });
    },

    logout() {
      localStorage.clear();
      this.$emit("changePage", "login-page");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });
    },

    hpChange(page) {
      this.page = page;
    },
  },
  components: {
    Category,
    AddTask,
    EditTask,
  },
  props: ["categories"],
  created() {
    this.fetchTasks();
  },
};
</script>

<style>
</style>
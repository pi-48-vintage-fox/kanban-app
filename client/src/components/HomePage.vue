<template>
  <section id="homepage">
    <nav class="navbar navbar-expand-lg navbar-light bg-custom-tp">
      <a class="navbar-brand" href="#">KanBar</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Add Task</a>
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
    <div id="content-section" class="container">
      <div class="row mt-4 mb-4">
        <Category
          v-for="(cat, i) in categories"
          :key="i"
          :categoryTitle="cat"
          :tasks="tasks"
        ></Category>
      </div>
    </div>
  </section>
</template>

<script>
import Category from "./Category";
import axios from "../config/axios";
export default {
  name: "HomePage",
  data() {
    return {
      tasks: []
    }
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
      localStorage.clear()
      this.$emit('changePage', 'login-page')
    }
  },
  components: {
    Category,
  },
  props: ["categories"],
  created() {
    this.fetchTasks();
  },
};
</script>

<style>
</style>
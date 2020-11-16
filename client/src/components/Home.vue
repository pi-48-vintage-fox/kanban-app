<template>
  <div>
    <!-- After Login -->

    <!-- Navbar -->
    <div class="home">
      <nav class="navbar navbar-expand-lg mb-5">
        <p class="logo font-italic text-white" href="#">kaB<u>an</u></p>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto" id="nav-home">
            <li class="nav-item active"></li>
          </ul>
          <span class="navbar-text mr-5">
            <button class="btn btn-outline-success"
            @click="$emit('client-page', 'addPage')"
            >Add task</button>
          </span>
          <span class="navbar-text mr-0" id="nav-logout">
            <button
              type="button"
              class="btn btn-link mr-5 font-weight-bolder text-white"
              v-on:click="logout"
            >
              Logout
            </button>
          </span>
        </div>
      </nav>

      <!-- Category -->
      <div class="head-category mb-5">
        <Category
          v-for="(cat, i) in categories"
          :key="i"
          :categoryName="cat"
          :fetch="fetchTask"
          :tasks="tasks"
          @toEditPage="toEditPage"
        ></Category>
      </div>
    </div>
    <!-- <p class="creator"><i>Background by :</i> Tomas Sobek/@tomas_nz</p> -->
  </div>
</template>

<script>
import axios from "axios";
import Category from "./Category";
export default {
  name: "Home",
  data() {
    return {
      tasks: [],
      categories: ["backlog", "todo", "doing", "done"],
      baseUrl: "https://kaban-fox-has.herokuapp.com",
    };
  },

  components: {
    Category,
  },

  methods: {
    toEditPage(payload) {
      this.$emit('toEditPage', payload)
    },

    changePage(value) {
      this.page = value;
    },
    logout() {
      localStorage.removeItem("access_token");
      this.$emit("client-page", "loginPage");
    },
    fetchTask() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/task`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          // console.log(response);
          response.data.forEach((el) => {
            el.createdAt = `${el.createdAt.slice(0, 10)} ${el.createdAt.slice(
              11,
              16
            )}`;
          });
          this.tasks = response.data;
          // console.log(this.tasks);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.fetchTask();
  },
};
</script>

<style>
</style>
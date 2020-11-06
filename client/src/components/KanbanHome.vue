<template>
  <section id="kanban-page">
    <nav class="navbar navbar-expand-lg mb-3 bg-light justify-content-between">
      <a class="navbar-brand">Kanban Board</a>
      <button
        class="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        @click.prevent="logout"
      >
        Logout
      </button>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <Category v-for="(cat, i) in categories"
            :key="i"
            :categoryDetail="cat"
            :tasks="tasks"> 
        </Category>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios"
import Category from "./Category";
export default {
  name: "KanbanHome",
  components: {
    Category,
  },
  props: ["categories", "tasks"],
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("changePage", "login-page");
    },
  },
};
</script>

<style>
</style>
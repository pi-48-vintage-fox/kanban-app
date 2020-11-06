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
    <div class="container-fluid" v-if="!showAddForm">
      <div class="row">
        <Category
          v-for="(cat, i) in categories"
          :key="i"
          :categoryDetail="cat"
          :tasks="tasks"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @addTask="addTask"
        >
        </Category>

      </div>
    </div>
    <addTask 
    v-if="showAddForm"
    @closeAddForm="showAddForm = false"
    :CategoryId="CategoryId"
    @fetchTasks="fetchTasks"
    >
    </addTask>
  </section>
</template>

<script>
import axios from "../config/axios";
import Category from "./Category";
import addTask from "./addTask";
import editTask from "./editTask";
export default {
  name: "KanbanHome",
  data() {
    return {
        showAddForm: false,
        CategoryId: ''
    }
  },
  components: {
    Category, addTask
  },
  props: ["categories", "tasks"],
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("changePage", "login-page");
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    editTask(id) {
      this.$emit("editTask", id);
    },
    addTask(id){ // <--- ambil data dari kategori id
        this.showAddForm = true
        this.CategoryId = id
    },
    fetchTasks(){
        this.$emit("fetchTasks")
    }
  },
};
</script>

<style>
</style>
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
          @editTask="editTask"
          @addTask="addTask"
          @changePage="changePage"
          @fetchKanban="fetchKanban"
        >
        </Category>

      </div>
    </div>
    <addTask 
    v-if="showAddForm"
    @closeAddForm="showAddForm = false"
    @changePage="changePage"
    :CategoryId="CategoryId"
    :reloadTask="reloadTask"
    >
    </addTask>
  </section>
</template>

<script>
import axios from "../config/axios";
import Category from "./Category";
import addTask from "./addTask";
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
  props: ["categories", "tasks", "reloadTask"],
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("changePage", "login-page");
    },
  
    editTask(id) {
      this.$emit("editTask", id);
    },
    addTask(id){ // <--- ambil data dari kategori id
        this.showAddForm = true
        this.CategoryId = id
    },
    fetchKanban(){
      console.log("masuk kanban home");
        this.$emit("fetchKanban")
    },
    changePage(payload){
      console.log(payload);
      this.$emit("changePage", payload)
    }
  },
};
</script>

<style>
</style>
<template>
    <div class="col-3">
      <div class="bg-info p-3 justify-content-center d-flex flex-column">
        <div class="text-center">
          <h3>{{ categoryDetail.name }}</h3>
          <button
            type="button"
            class="btn btn-secondary"
            @click.prevent="addTask"
          >
            Add Task
          </button>
        </div>
        <div class="card-root">
          <Task
            v-for="task in taskPerCategory"
            :key="task.id"
            :task="task"
            :categoryDetail="categoryDetail"
            @deleteTask="deleteTask"
            @editTask="editTask"
            @updateTask="updateTask"
          ></Task>
        </div>
      </div>
    </div>
  
</template>

<script>
import axios from "../config/axios";
import Task from "./Task";
import addTask from "./addTask";
export default {
  data(){
    return {
      showAddForm: false
    }
  },
  name: "Category",
  components: {
    Task, addTask
  },
  methods: {
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    editTask(id) {
      this.$emit("editTask", id);
    },
    addTask() {
      this.$emit("addTask", this.categoryDetail.id);
    },
    updateTask(){

    }
  },
  props: ["categoryDetail", "tasks"],
  computed: {
    taskPerCategory() {
      return this.tasks.filter((el) => {
        return el.CategoryId === this.categoryDetail.id;
      });
    },
  },
};
</script>

<style>
</style>
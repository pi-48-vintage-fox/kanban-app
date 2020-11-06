<template>
  <div class="col-3">
    <div class="bg-info p-3 justify-content-center d-flex flex-column">
      <div class="text-center">
        <h3>{{categoryDetail.name}}</h3>

        <button type="button" class="btn btn-secondary">Add Task</button>
      </div>
      <div class="card-root">
        <Task 
            v-for="task in tasks"
            :key="task.id"
        ></Task>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios"
import Task from "./Task";
export default {
  name: "Category",
  components: {
    Task,
  },
  props: ['categoryDetail', 'tasks']
};
</script>

<style>
</style>
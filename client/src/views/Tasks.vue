<template>
  <!-- cards -->
  <div class="container bg-color-navbar card my-4">
    <div class="row">
      <CardCategories
      class="col card m-3 bg-card"
        v-for="(category, key) in categories"
        :key="key"
        :tasks="tasks"
        :categoryName="category"
        @addTask="addTask"
        @editTask="editTask"
        @editCategory="editCategory"
        @deleteTask="deleteTask"
      ></CardCategories>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import CardCategories from "../components/CardCategories";
export default {
  name: "Tasks",
  props: ['tasks'],
  components: {
    CardCategories,
  },
  data() {
    return {
      page: "tasks",
      categories: ["Backlog", "Todo", "Doing", "Done"],
    };
  },
  methods: {
    addTask(value) {
      this.$emit('addTask', value)
    },
    editTask(value) {
      this.$emit('editTask', value)
    },
    editCategory(value) {
      this.$emit('editCategory', value)
    },
    deleteTask(value) {
      this.$emit('deleteTask', value)
    }
  },
};
</script>

<style>
</style>
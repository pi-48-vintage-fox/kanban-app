<template>
  <div class="sub-board">
    <div class="category-title">
      <h1>{{ category }}</h1>
      <a href="#" @click.prevent="deleteCategory">
        <svg
          id="delete-category-icon"
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          class="bi bi-x-circle"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            fill-rule="evenodd"
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </a>
    </div>
    <draggable class="content overflow-auto" :list="categoriesAreas">
      <Task
        v-for="task in tasksPerCategory"
        :key="task.id"
        :task="task"
        :categories="categories"
        @deleteTask="deleteTask"
        @editTask="editTask"
        @moveTask="moveTask"
      ></Task>
    </draggable>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Task from "./Task";
import draggable from "vuedraggable";
export default {
  name: "Category",
  data() {
    return {
      categoriesAreas: [],
      filteredTasks: "",
    };
  },
  components: {
    Task,
    draggable,
  },
  methods: {
    deleteCategory() {
      const categoryFound = this.categoriesObj.find(
        (element) => element.name === this.category
      );
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit("deleteCategory", categoryFound.id);
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        }
      });
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    editTask(payload) {
      console.log("sampe");
      this.$emit("editTask", payload);
    },
    moveTask(payload) {
      this.$emit("moveTask", payload);
    },
  },
  props: ["category", "tasks", "categories", "categoriesObj"],
  computed: {
    tasksPerCategory() {
      this.filteredTasks = this.tasks.filter(
        (element) => element.category === this.category
      );
      return this.filteredTasks;
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div class="card-body bg-task mt-3 pb-0 pt-1 card">
      <div class="row flex-between">
        <h5 class="card-title text-task">{{ task.title }}</h5>
        <div>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-pencil-square"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            type="button"
            @click="editTask(task.id)"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          <EditTaskForm
            v-show="taskForm === true"
            @submitEditForm="submitEditForm"
            @closeEditForm="closeEditForm"
            :task="task"
          ></EditTaskForm>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-left-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            type="button"
            @click="editCategory(task.id)"
          >
            <path
              fill-rule="evenodd"
              d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
           <EditCategory
            v-show="categoryForm === true"
            @submitCategoryForm="submitCategoryForm"
            @closeCategoryForm="closeCategoryForm"
            :task="task"
          ></EditCategory>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            type="button"
            @click="deleteTask(task.id)"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
            />
          </svg>
        </div>
      </div>
      <p class="card-text text-task description">
        {{ task.description }}
      </p>
      <div class="row flex-between">
        <p class="footer mb-1">{{ task.User.email }}</p>
        <p class="footer mb-1">{{ task.updatedAt.slice(0,10) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import EditTaskForm from "../views/EditTaskForm";
import EditCategory from "../views/EditCategory";
export default {
  name: "Task",
  props: ["task"],
  components: {
    EditTaskForm,
    EditCategory,
  },
  data() {
    return {
      taskForm: false,
      categoryForm: false,
    };
  },
  methods: {
    editTask(id) {
      console.log(id);
      this.taskForm = true;
    },
    editCategory(id) {
      console.log(id);
      this.categoryForm = true;
    },
    deleteTask(id) {
      console.log(id);
    },
    submitEditForm(value) {
      this.taskForm = false;
      this.$emit('editTask', value)
    },
    closeEditForm(value) {
      this.taskForm = value;
    },
    submitCategoryForm(value) {
      this.categoryForm = false;
      //this.$emit('editTask', value)
    },
    closeCategoryForm(value) {
      this.categoryForm = value;
    },
  },
};
</script>

<style>
</style>
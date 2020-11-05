<template>
  <div class="col card m-3 bg-card" style="width: 18rem">
    <div class="cards text-task">
      <h1>{{ categoryName }}</h1>
    </div>
    <Task
      v-for="task in filterTasks"
      :key="task.id"
      :task="task"
      @editTask="editTask"
    ></Task>
    <p type="button" class="nav-link" @click="addTask">
      <i
        class="fa fa-plus-square text-task my-2 cards display-5"
        aria-hidden="true"
        >Add Todo</i
      >
    </p>
    <AddTaskForm
      :categoryName="categoryName"
      v-show="addForm === true"
      @submitAddForm="submitAddForm"
      @closeAddForm="closeAddForm"
    ></AddTaskForm>
  </div>
</template>

<script>
import Task from "./Task";
import AddTaskForm from "../views/AddTaskForm";
export default {
  name: "CardCategories",
  props: ["tasks", "categoryName"],
  components: {
    Task,
    AddTaskForm,
  },
  data() {
    return {
      addForm: false,
    };
  },

  methods: {
    fetchCategory() {
      this.tasks.forEach((el) => {
        el.updatedAt = el.updatedAt.slice(0, 10);
        if (el.category == "Backlog") {
          this.backlog.push(el);
        } else if (el.category == "Todo") {
          this.todo.push(el);
        } else if (el.category == "Doing") {
          this.doing.push(el);
        } else if (el.category == "Done") {
          this.done.push(el);
        }
      });
      //  this.$emit('fetchCategory')
    },
    addTask() {
      this.addForm = true;
    },
    submitAddForm(value) {
      this.addForm = false;
      this.$emit("addTask", value);
    },
    closeAddForm(value) {
      this.addForm = value;
    },
    editTask(value) {
      this.$emit('editTask',value);
    },
  },
  created() {
    this.fetchCategory();
  },
  computed: {
    filterTasks() {
      return this.tasks.filter((task) => task.category === this.categoryName);
    },
  },
};
</script>
 
<style>
</style>
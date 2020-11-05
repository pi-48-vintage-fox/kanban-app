<template>
  <div class="row" style="width: 100%">
    <div class="col-3">
      <div class="item planning">
        <h4>Backlog</h4>
        <Task
          v-for="tasks in TaskBacklog"
          :key="tasks.id"
          :tasks="tasks"
          @toEditPage="toEditPage"
          @toEditCategory="toEditCategory"
        >
        </Task>
      </div>
    </div>
    <div class="col-3">
      <div class="item inprogress">
        <h4>Todo</h4>
        <Task
          v-for="tasks in TaskTodo"
          :key="tasks.id"
          :tasks="tasks"
          @toEditPage="toEditPage"
          @toEditCategory="toEditCategory"
        >
        </Task>
      </div>
    </div>
    <div class="col-3">
      <div class="item done">
        <h4>Doing</h4>
        <Task
          v-for="tasks in TaskDoing"
          :key="tasks.Category.id"
          :tasks="tasks"
          @toEditPage="toEditPage"
          @toEditCategory="toEditCategory"
        >
        </Task>
      </div>
    </div>
    <div class="col-3">
      <div class="item comment">
        <h4>Done</h4>
        <Task
          v-for="tasks in TaskDone"
          :key="tasks.Category.id"
          :tasks="tasks"
          @toEditPage="toEditPage"
          @toEditCategory="toEditCategory"
          @toDelete="toDelete"
        >
        </Task>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Category",
  components: {
    Task,
  },
  props: ["tasks"],

  computed: {
    TaskBacklog() {
      return this.tasks.filter(
        (element) => element.Category.name === "Backlog"
      );
    },
    TaskTodo() {
      return this.tasks.filter((element) => element.Category.name === "Todo");
    },
    TaskDoing() {
      return this.tasks.filter((element) => element.Category.name === "Doing");
    },
    TaskDone() {
      return this.tasks.filter((element) => element.Category.name === "Done");
    },
  },
  methods: {
    toEditPage(payload) {
      this.$emit("toEditPage", payload);
    },
    toEditCategory(payload) {
      this.$emit("toEditCategory", payload)
    },
    toDelete(payload) {
      this.$emit("toDelete", payload)
    }
  },
};
</script>

<style>
</style>
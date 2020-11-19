<template>
  <div class="scroll" style="width: 20%; height: auto">
    <div
      class="card-header bg-primary"
      style="color: blanchedalmond; font-weight: bolder"
    >
      {{ category.name }}
      <i class="fa fa-plus" aria-hidden="true"></i>
    </div>
    <!-- ====================================== -->
    <TaskPage
      v-for="tasks in taskPerCategory"
      :category="category"
      :key="tasks.id"
      :tasks="tasks"
      @move="move"
      @deleteTask="deleteTask"
      @showEdit="showEdit"
    >
    </TaskPage>
  </div>
</template>

<script>
import TaskPage from "./Tasks";
export default {
  name: "Category",
  components: {
    TaskPage,
  },
  props: ["category", "tasks"],
  computed: {
    taskPerCategory() {
      return this.tasks.filter((element) => {
        return element.CategoryId === this.category.id;
      });
    },
  },
  methods: {
    move(payload) {
      this.$emit("move", payload);
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    showEdit(payload) {
      this.$emit("showEdit", payload);
    }
  }
};
</script>

<style>
</style>
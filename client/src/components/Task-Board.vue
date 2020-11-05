<template>
  <div class="task-board" :class="colorComputed">
    <div class="task-board-title">
      <i class="far fa-clone" :class="colorComputed"></i>
      <p>{{ title }}</p>
      <i class="fas fa-ellipsis-h card-menu"></i>
    </div>
    <TaskItem 
      v-for="(task,i) in tasks" :key=i
      :task=task
    ></TaskItem>
    <div class="new-task mb-1" v-if="addNew">
      <textarea        
        rows="5"
        placeholder="ex. Doing Laundry"
        autofocus
        v-model="newTaskTitle"
      >
      </textarea>
      <div class="new-task-btn">
        <button type="button" class="btn btn-success btn-sm"><i class="fas fa-save success"></i> Save</button>
        <button type="button" class="btn btn-warning btn-sm" @click="addNew=false"><i class="fas fa-times warning"></i> Cancel</button>
      </div>
    </div>
    <div class="task" @click="addNewTask">+ Add new</div>
  </div>
</template>

<script>
import TaskItem from "./Task-Item";
export default {
  name: "TaskBoard",
  components: {
    TaskItem,
  },
  props: ["title", "tasks"],
  data() {
    return {
      addNew: false,
      newTaskTitle: []
    };
  },
  methods: {
    addNewTask() {
      this.addNew = true;
    },
  },
  computed: {
    colorComputed() {
      switch (this.title.toLowerCase()) {
        case "backlog":
          return "danger";
          break;
        case "todo":
          return "warning";
          break;
        case "doing":
          return "primary";
          break;
        case "done":
          return "success";
          break;
        default:
          return "primary";
          break;
      }
    },
  },
};
</script>

<style>
</style>
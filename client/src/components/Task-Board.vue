<template>
  <div class="task-board" :class="colorComputed">
    <div class="task-board-title">
      <i class="far fa-clone" :class="colorComputed"></i>
      <p>{{ title }}</p>
    </div>
    <div class="task-list" id="task-container">
      <TaskItem
        v-for="(task, i) in tasks"
        :key="i"
        :task="task"
        :cats=cats
        @editTask="editTask"
        @deleteTask="deleteTask"
      ></TaskItem>
      <div class="new-task mb-1" v-if="addNew">
        <textarea
          rows="5"
          placeholder="ex. Doing Laundry"
          autofocus
          v-model="newTaskTitle"
          ref="taskTextarea"
        >
        </textarea>
        <div class="new-task-btn">
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="saveTask"
          >
            <i class="fas fa-save success"></i> Save
          </button>
          <button
            type="button"
            class="btn btn-warning btn-sm"
            @click="addNew = false"
          >
            <i class="fas fa-times warning"></i> Cancel
          </button>
        </div>
      </div>
      <div class="task" @click="addNewTask">+ Add new</div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./Task-Item";
export default {
  name: "TaskBoard",
  components: {
    TaskItem,
  },
  props: ["title", "tasks", "catId","cats"],
  data() {
    return {
      addNew: false,
      newTaskTitle: "",
      options: {
        dropzoneSelector: ".task-board",
        draggableSelector: ".task",
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
      },
    };
  },
  methods: {
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    scrollToEnd() {
      let container = this.$el.querySelector("#task-container");
      container.scrollTop = container.scrollHeight;
    },
    addNewTask() {
      this.addNew = true;
      this.$nextTick(() => {
        this.$refs.taskTextarea.focus();
        this.scrollToEnd();
      });
    },
    saveTask() {
      if (this.newTaskTitle == "") {
        this.$vToastify.error("Please fill task title", "Ooops..");
      } else {
        let payload = {
          title: this.newTaskTitle,
          CategoryId: this.catId,
        };
        this.addNew = false;
        this.newTaskTitle = null;
        this.$emit("addNewTask", payload);
      }
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

<style >
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
<template>
  <div class="two-col-layout" id="main-page">
    <div class="sidebar">
      <div class="sidebar-title">
        <div class="logo">
          <h2 class="kang">KANG</h2>
          <h2 class="bang">BANG</h2>
        </div>
        <div class="logo-sub">
          <p>Stop Starting, Start Finishing</p>
        </div>
      </div>
      <div class="sidebar-menus">
        <div class="menu-section">
          <p>MENU</p>
          <div class="divider">
            <hr />
          </div>
        </div>
        <div class="menu-item active">
          <i class="fas fa-columns primary"></i> Home
        </div>
        <div class="menu-item">
          <i class="far fa-calendar-alt warning"></i> Calendar
        </div>
        <div class="menu-item">
          <i class="far fa-bell danger"></i> Notifications
        </div>
      </div>
      <div class="sidebar-footer">
        <div class="menu-section">
          <p>OPTIONS</p>
          <div class="divider">
            <hr />
          </div>
        </div>
        <div class="menu-item" @click="logOut" id="logoutBtn">
          <i class="fas fa-sign-out-alt danger"></i> Sign Out
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-top"><i class="fas fa-columns"></i> Boards</div>
      <div class="content-main">
        <div class="draggable-container" v-drag-and-drop:options="options">
          <vue-draggable-group
            v-for="task in tasks"
            v-model="task.Tasks"
            :groups="tasks"
            :data-id="task.id"
            :key="task.id"
            @change="onGroupsChange"
          >
            <TaskBoard
              :title="task.name"
              :tasks="task.Tasks"
              :catId="task.id"
              :cats="tasks"
              :data-id="task.id"
              @addNewTask="addNewTask"
              @editTask="editTask"
              @deleteTask="deleteTask"
            ></TaskBoard>
          </vue-draggable-group>
        </div>
        <div class="new-list-container" id="new-list">
          <div class="new-list" @click="newCategories">
            <p class="mb-1">+ Add new list</p>
          </div>
          <div
            class="new-task mb-1"
            style="
              background-color: rgba(49, 56, 78, 1);
              padding: 10px;
              border-radius: 7px;
            "
            v-if="addNewCategories"
          >
            <textarea
              rows="5"
              placeholder="ex. Backlog 2"
              autofocus
              ref="taskTextarea"
              v-model="newCategory"
            >
            </textarea>
            <div class="new-task-btn">
              <button
                type="button"
                class="btn btn-success btn-sm"
                @click="insertCategory"
              >
                <i class="fas fa-save success"></i> Save
              </button>
              <button
                type="button"
                class="btn btn-warning btn-sm"
                @click="addNewCategories = false"
              >
                <i class="fas fa-times warning"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="content-footer">
        <p class="author">Created by Mochamad Zulfikar</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskBoard from "./Task-Board";
import { VueDraggableDirective } from "vue-draggable";

export default {
  name: "MainPage",
  directives: {
    dragAndDrop: VueDraggableDirective,
  },
  components: {
    TaskBoard,
  },
  data() {
    return {
      addNewCategories: false,
      newCategory: "",
      options: {
        dropzoneSelector: "#task-container",
        draggableSelector: ".task",
        reactivityEnabled: true,
        items: [], // list of selected draggable elements
      },
    };
  },
  props: ["tasks"],
  methods: {
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    onGroupsChange(e) {
      console.log({ e });
    },
    scrollToEnd() {
      let container = this.$el.querySelector(".content-main");
      container.scrollLeft = container.scrollWidth;
    },
    newCategories() {
      this.addNewCategories = true;
      this.$nextTick(() => {
        this.$refs.taskTextarea.focus();
        this.scrollToEnd();
      });
    },
    insertCategory() {
      if (this.newCategory == "") {
        this.$vToastify.error("You must fill the name", "Ooops..");
      } else {
        let payload = {
          name: this.newCategory,
        };
        this.$emit("newCategory", payload);
      }
    },
    logOut() {
      this.$emit("logout");
    },
    addNewTask(payload) {
      this.$emit("addNewTask", payload);
    },
  },
  mounted() {
    this.$emit("load");
  },
};
</script>

<style>
.draggable-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>
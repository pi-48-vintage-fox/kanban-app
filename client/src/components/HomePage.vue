<template>
    <div>
        <link rel="stylesheet" href="https://unpkg.com/xp.css">
        <!-- HOME PAGE========================================================= -->
        <div class="homeface">
            <Category
                v-for="(cat, i) in categories"
                :key="i"
                :category="cat"
                :categories="categories"
                :tasks="tasks"
                @move="move"
                @deleteTask="deleteTask"
                @showEdit="showEdit">              
            </Category>
        </div>
   
        <div id="navbar-bottom" class="btn-group dropup">
            <img v-on:click.prevent="showMenu()" id="button-start" src="./public/image/active.png" style="cursor: pointer;">
        </div>

        <div v-show="!changer" id="start-menu" class="window" style="width: 300px">
            <div class="title-bar">
                <div class="title-bar-text">{{username}}</div>
            </div>
            <div id="window-menu" class="window-body">
                <div v-on:click.prevent="showAdd()" class="menu-btn"><i class="fa fa-plus" aria-hidden="true" style="margin-right: 5px;"></i> Add New Task</div>
                <a href="https://dakochan666.github.io/dance-revolution/"><div class="menu-btn"><i class="fa fa-bolt" aria-hidden="true" style="margin-right: 5px; margin-left: 3px"></i> Dance Revolution!</div></a>
                <div v-on:click.prevent="logout()" class="menu-btn"><i class="fa fa-power-off" aria-hidden="true" style="margin-right: 5px;"></i> Log Out</div>
            </div>
        </div>

        <!-- Add Task Form==================================== -->
        <div v-show="!changerAdd" id="addForm" class="window" style="width: 300px;">
            <div class="title-bar">
                <div class="title-bar-text">Create New Task</div>
                <div class="title-bar-controls">
                    <button v-on:click.prevent="unshowAdd()" aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body" style="padding: 10px;">
                <form @submit.prevent="add">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Title :</p>
                    <input v-model="titleAdd" class="form-control form-control-sm" type="text" style="margin-bottom: 10px;" placeholder="Type your task title..">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Description :</p>
                    <input v-model="descriptionAdd" class="form-control form-control-sm" type="text" style="margin-bottom: 10px;" placeholder="Describe your task..">
                    <button id="submitlogin" type="submit" style="margin-bottom: 20px;">Submit</button>
                </form>
            </div>
        </div>

        <!-- Edit Task Form==================================== -->
        <div v-show="!changerEdit" id="addForm" class="window" style="width: 300px;">
            <div class="title-bar">
                <div class="title-bar-text">Edit Task</div>
                <div class="title-bar-controls">
                    <button v-on:click.prevent="unshowEdit()" aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body" style="padding: 10px;">
                <form @submit.prevent="editTask">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Title :</p>
                    <input v-model="titleEdit" class="form-control form-control-sm" type="text" style="margin-bottom: 10px;" placeholder="Type your task title..">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Description :</p>
                    <input v-model="descriptionEdit" class="form-control form-control-sm" type="text" style="margin-bottom: 10px;" placeholder="Describe your task..">
                    <button id="submitlogin" type="submit" style="margin-bottom: 20px;">Submit</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
// import TaskPage from './Tasks'
// import axios from "../config/axios";
import Category from "./Category";
export default {
  name: "HomePage",
  data() {
    return {
      username: localStorage.getItem("name"),
      changer: true,
      changerAdd: true,
      changerEdit: true,
      titleAdd: "",
      descriptionAdd: "",
      titleEdit: "",
      descriptionEdit: "",
      idEdit: 0
    };
  },
  components: {
    Category,
  },
  props: ["categories", "tasks"],
  methods: {
    showMenu() {
      if (this.changer == true) {
        this.changer = false;
      } else if (this.changer == false) {
        this.changer = true;
      }
    },
    showAdd() {
      this.changerAdd = false;
      this.changer = true;
    },
    showEdit(payload) {
      this.changerEdit = false;
      this.changer = true;
      (this.titleEdit = payload.title),
        (this.descriptionEdit = payload.description),
        (this.idEdit = payload.id);
    },
    unshowAdd() {
      this.changerAdd = true;
    },
    unshowEdit() {
      this.changerEdit = true;
    },
    add() {
      let payload = {
        title: this.titleAdd,
        description: this.descriptionAdd,
        category: "Backlog",
        UserId: localStorage.getItem("id"),
      };
      this.unshowAdd();
      this.$emit("add", payload);

      this.titleAdd = ''
      this.descriptionAdd = ''
    },
    logout() {
      localStorage.clear();
      this.$emit("logout");
    },
    move(payload) {
      this.$emit("move", payload);
    },
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    editTask() {
      let payload = {
        id: this.idEdit,
        title: this.titleEdit,
        description: this.descriptionEdit,
      };
      this.unshowEdit();
      this.$emit("editTask", payload);

      this.titleEdit = ''
      this.descriptionEdit = ''
    },
  }
};
</script>

<style>
</style>
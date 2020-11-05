<template>
  <div class="two-col-layout" id='main-page'>
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
        <div class="menu-item" @click="logOut">
          <i class="fas fa-sign-out-alt danger"></i> Sign Out
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-top"><i class="fas fa-columns"></i> Boards</div>
      <div class="content-main">
        
        <TaskBoard 
          v-for="(task,i) in tasks" :key = i
          :title = task.name
          :tasks = task.Tasks
        ></TaskBoard>
        <div class="new-list">+ Add new list</div>
      </div>
      <div class="content-footer">
        <p class="author">Created by Mochamad Zulfikar</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskBoard from "./Task-Board"
export default {
  name:"MainPage",
  components:{
    TaskBoard
  },
  props:[
    "tasks"
  ],
  methods:{
    logOut(){
      this.$emit("logout")
    }
  },
  mounted(){
    this.$emit("load")
  }
};
</script>

<style>
</style>
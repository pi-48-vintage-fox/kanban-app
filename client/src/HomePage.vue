<template>
  <div>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-primary" style="opacity: 0.9">
      <a class="text-light font-weight-bold display-4 border p-1" href="#"><i class="fas fa-thumbtack"></i> Kanban App</a>
      <div class="navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#"><i class="fas fa-home"></i> Home<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Something</a>
          </li>
        </ul>
      </div>
      <span class="navbar-text">
        <ul class="navbar-nav">
          <li class="nav-link active" id="username">
            <i class="fas fa-user"></i> {{ currentUser }}
          </li>
          <li class="nav-item">
            <a @click.prevent="logout" class="nav-link bg-primary text-light text-center border" href="#"><i class="fas fa-power-off"></i> Log Out</a>
          </li>
        </ul>
      </span>
    </nav>
    

    
    <div class="d-flex flex-wrap justify-content-around align-items-start">
      
      <CategoryComponent
      v-for="cat in categories"
      :key="cat.id"
      :cat="cat"
      :tasks="tasks"
      :currentId="currentId"
      :fetchTasks="fetchTasks"
      :categories="categories"
      ></CategoryComponent>
      
    </div>
    
  </div>
  
</template>
<script>
import axios from "../config/axios"
import CategoryComponent from "./CategoryComponent"
export default {
  name: "HomePage",
  data() {
    return {
      tasks : [],
      categories : [],
      currentId : '',
      currentUser : ''
    }

  },
  components : {
    CategoryComponent
  },
  props : ['changePage'],
  methods : {
    fetchTasks(){
      axios({
          method : 'get',
          url : '/tasks',
          headers : {access_token : localStorage.access_token}
      })
      .then(result=>{
          this.tasks = result.data
      })
      .catch(err=>{
          console.log(err);
      })
    },
    fetchCategories(){
      axios({
          method : 'get',
          url : '/categories',
          headers : {access_token : localStorage.access_token}
      })
      .then(result=>{
          this.categories = result.data
      })
      .catch(err=>{
          console.log(err);
      })
    },
    inituser(){
      this.currentUser = localStorage.email
      this.currentId = localStorage.id
    },
    logout(){
      localStorage.clear()
      this.currentUser = ''
      this.currentId = ''
      this.changePage('login-page')
    }
  },
  created(){
    this.inituser()
    this.fetchTasks()
    this.fetchCategories()
  }
};
</script>

<style>
</style>
<template>
  <div>
    <NavBar @logout="logout" ></NavBar>
    <div class="container mt-5">
      <div class="row">
        <Category 
          :categories="category"
          :tasks="tasks"
          v-for="(cat) in category"
          :key="cat.id"
          :categoryDetail="cat"
          :fetchTasks="fetchTasks"
          >
        </Category>
        
        <div class="button-add">
          <button class="btn-small red accent-2" @click.prevent="toAddPage" >
            <i class="fa fa-plus-square"></i>  New Task
          </button>
        </div>
        
      </div>
      
    </div>
      <Add v-if="pageName === 'add-page'" > </Add>
  </div>
</template>

<script>
import axios from "../config/axios";
import NavBar from "./NavBar";
import Category from "./Category"
import "./style.css";
export default {
  name: "Home",
  data() {
    return {
      message: "ini Home",
      tasks: [],
      category: [
        {
          id: 1,
          title: 'Back Log'
        },{
          id: 2,
          title: 'Todo'
        },{
          id: 3,
          title: 'Doing'
        },{
          id: 4,
          title: 'Done'
        }  
      ],
      pageName : 'home-page',
      
    };
  },
  components: {
    NavBar, Category
  },
  
  methods: {
    fetchTasks() {
      const access_token = localStorage.getItem("access_token");
      

      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: access_token
        }
      })
        .then(({ data }) => {
          this.tasks = data.task
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    toAddPage(){
      this.$emit('changePage', 'add-page')
    },
    logout(){
      this.$emit('logout')
    }
   
  },
  created() {
    this.fetchTasks();
    
  },
  
};
</script>

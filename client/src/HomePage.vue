<template>
  <!-- Home -->
  <div>
    <!-- Navbar -->
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
    <!-- Navbar End -->

    <!-- Content -->
    <div class="d-flex flex-wrap justify-content-around align-items-start">
      <!-- Backlog -->
      <div class="card border-primary mt-3 mb-3 order-1" style="max-width: 18rem; max-height: 500px">
        <div class="card-header font-weight-bold text-light display-4 text-center red">
          Backlog
        </div>
        <!-- List -->
        <div style="overflow: auto; position: relative">
          <div class="card-body" v-for="task in backlogFilter" :key="task.id">
            <h5 class="card-title">{{ task.title }}</h5>
            <hr />
            <p class="card-text">{{ task.description }}</p>
            <p class="text-muted">Created at : {{ getDate(task.createdAt) }}</p>
            <hr />
            <!-- Button Control -->
            <div class="d-flex justify-content-between">
              <div v-if="task.UserId === +currentId">
                <a href="#"><i class="fas fa-chevron-circle-right"></i></a>
              </div>
              <div class="text-muted">
                <p class="text-center">By : {{ task.User.email }}</p>
              </div>
              <div v-if="task.UserId === +currentId">
                <a href="#">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <!-- Button Control End -->
          </div>
        </div>
        <!-- List End -->
        <div class="card-footer bg-transparent text-center font-weight-bold">
          <a href="#"><i class="fas fa-plus-circle"></i><br />Add Task</a>
        </div>
      </div>
      <!-- Backlog End -->

      <!-- Todo -->
      <div class="card border-primary mt-3 mb-3 order-2" style="max-width: 18rem; max-height: 500px">
        <div class="card-header font-weight-bold text-center text-light display-4 orange">
          Todo
        </div>
        <!-- List -->
        <div style="overflow: auto; position: relative">
          <div class="card-body" v-for="task in todoFilter" :key="task.id">
            <h5 class="card-title">{{ task.title }}</h5>
            <hr />
            <p class="card-text">{{ task.description }}</p>
            <p class="text-muted">Created at : {{ getDate(task.createdAt) }}</p>
            <hr />
            <!-- Button Control -->
            <div class="d-flex justify-content-between">
              <div v-if="task.UserId === +currentId">
                <a href="#"><i class="fas fa-chevron-circle-left"></i></a>
                <a href="#"><i class="fas fa-chevron-circle-right"></i></a>
              </div>
              <div class="text-muted">
                <p class="text-center">By : {{ task.User.email }}</p>
              </div>
              <div v-if="task.UserId === +currentId">
                <a href="#">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <!-- Button Control End -->
          </div>
        </div>
        <!-- List End -->
        <div class="card-footer bg-transparent text-center font-weight-bold">
          <a href="#"><i class="fas fa-plus-circle"></i><br />Add Task</a>
        </div>
      </div>
      <!-- Todo End -->

      <!-- Doing -->
      <div class="card border-primary mt-3 mb-3 order-4" style="max-width: 18rem; max-height: 500px">
        <div class="card-header font-weight-bold text-center text-light display-4 green">
          Doing
        </div>
        <!-- List -->
        <div style="overflow: auto; position: relative">
          <div class="card-body" v-for="task in doingFilter" :key="task.id">
            <h5 class="card-title">{{ task.title }}</h5>
            <hr />
            <p class="card-text">{{ task.description }}</p>
            <p class="text-muted">Created at : {{ getDate(task.createdAt) }}</p>
            <hr />
            <!-- Button Control -->
            <div class="d-flex justify-content-between">
              <div v-if="task.UserId === +currentId">
                <a href="#"><i class="fas fa-chevron-circle-left"></i></a>
                <a href="#"><i class="fas fa-chevron-circle-right"></i></a>
              </div>
              <div class="text-muted">
                <p class="text-center">By : {{ task.User.email }}</p>
              </div>
              <div v-if="task.UserId === +currentId">
                <a href="#">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <!-- Button Control End -->
          </div>
        </div>
        <!-- List End -->
        <div class="card-footer bg-transparent text-center font-weight-bold">
          <a href="#"><i class="fas fa-plus-circle"></i><br />Add Task</a>
        </div>
      </div>
      <!-- Doing End -->

      <!-- Done -->
      <div class="card border-primary mt-3 mb-3 order-20" style="max-width: 18rem; max-height: 500px">
        <div class="card-header font-weight-bold text-light display-4 text-center blue">
          Done
        </div>
        <!-- List -->
        <div style="overflow: auto; position: relative">
          <div class="card-body" v-for="task in doneFilter" :key="task.id">
            <h5 class="card-title">{{ task.title }}</h5>
            <hr />
            <p class="card-text">{{ task.description }}</p>
            <p class="text-muted">Created at : {{ getDate(task.createdAt) }}</p>
            <hr />
            <!-- Button Control -->
            <div class="d-flex justify-content-between">
              <div v-if="task.UserId === +currentId">
                <a href="#"><i class="fas fa-chevron-circle-left"></i></a>
              </div>
              <div class="text-muted">
                <p class="text-center">By : {{ task.User.email }}</p>
              </div>
              <div v-if="task.UserId === +currentId">
                <a href="#">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <!-- Button Control End -->
          </div>
        </div>
        <!-- List End -->
        <div class="card-footer bg-transparent text-center font-weight-bold">
          <a href="#"><i class="fas fa-plus-circle"></i><br />Add Task</a>
        </div>
      </div>
      <!-- DOne End -->
    </div>
    <!-- Content End -->
  </div>
  <!-- Home End -->
</template>

<script>
import axios from "../config/axios"
export default {
  name: "HomePage",
  data() {
    return {
      tasks : [],
      currentId : '',
      currentUser : ''
    }

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
          console.log(result.data)
          this.tasks = result.data
      })
      .catch(err=>{
          console.log(err);
      })
    },
    inituser(){
      this.currentUser = localStorage.email
      this.currentId = localStorage.id
    },
    destroyuser(){
      this.currentUser = ''
      this.currentId = ''
    },
    logout(){
      this.changePage('login-page')
      localStorage.clear()
      this.currentUser = ''
      this.currentId = ''
    },
    getDate(date){
      let tanggal = date.split("T")[0]
      return tanggal
    }
  },
  computed: {
    backlogFilter(){
      if(this.tasks.length > 0){
        let backlogTask = this.tasks.filter(task =>{
            return task.category === 'backlog'
        })
        return backlogTask
      }
    },
    todoFilter(){
      if(this.tasks.length > 0){
        let todoTask = this.tasks.filter(task =>{
          return task.category === 'todo'
        })
        return todoTask
      }
    },
    doingFilter(){
      if(this.tasks.length > 0){
        let doingTask = this.tasks.filter(task =>{
          return task.category === 'doing'
        })
        return doingTask
      }
    },
    doneFilter(){
      if(this.tasks.length > 0){
        let doneTask = this.tasks.filter(task =>{
          return task.category === 'done'
        })
        return doneTask
      }
    }
  },
  created(){
    this.inituser()
    this.fetchTasks()
  }
};
</script>

<style>
</style>
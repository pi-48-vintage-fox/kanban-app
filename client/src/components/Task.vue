<template>
  <div>
    <div class="row mt-4" v-if="!isEdit">
      <div class="card-container shadow rounded">
        <div class="card-title">
          <div class="card-task">
            <strong>{{task.title}}</strong>
          </div>
          <div class="card-by">{{task.User.username}}</div>
        </div>
        <div class="card-description">{{task.description}}</div>
        <div class="btn-icon-group" v-if="username !== task.User.username">
          <button
            class="btn-small red accent-2 button-mark"
            @click.prevent="updateCategory"
            disabled
          >Mark as {{markAs}}</button>
          <a class="disableClick" @click.prevent="toEditForm" href="#">
            <i class="far fa-edit icon"></i>
          </a>
          <a class="disableClick" href="#" @click="deleteTask" >
            <i class="fas fa-trash-alt icon"></i>
          </a>
        </div>
        <div class="btn-icon-group" v-else-if="username === task.User.username">
          <button
            class="btn-small red accent-2 button-mark"
            @click.prevent="updateCategory"
            
          >Mark as {{markAs}}</button>
          <a @click.prevent="toEditForm" href="#">
            <i class="far fa-edit icon"></i>
          </a>
          <a href="#" @click="deleteTask" >
            <i class="fas fa-trash-alt icon"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-if="isEdit">
      <div class="card-container-edit shadow rounded">
        <div class="card-title">
          <div class="card-task">
            <form>
            <div class="form-group">
              <label>Task</label>
              <input type="text" v-model="edit_task">
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text" class="form-control" v-model="edit_description"></textarea>
            </div>
            <button class="btn-small red accent-2" type="submit" @click.prevent="UpdateTask"> Update </button>
             <button class="btn-small grey lighten-1" type="submit" @click.prevent="() => {isEdit = false }"> Cancel </button>
            </form>
          </div>
          <div class="card-by"></div>
        </div>
        <div class="card-description"></div>
        <div class="btn-icon-group">
         
        </div>
      </div>
    
  </div>
</template>

<script>
import "./style.css";
import axios from "../config/axios";
import Edit from "./Edit";
export default {
  name: "Task",
  data() {
    return {
      category: this.task.category,
      isEdit: false,
      edit_task: "",
      edit_description: "",
      username : ''
    };
  },
  components: {
    Edit
  },
  props: ["task", "categoryName", "fetchTasks"],
  methods: {
    updateCategory() {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${this.task.id}`,
        method: "PATCH",
        headers: {
          access_token
        },
        data: {
          category: this.category
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.fetchTasks();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    deleteTask() {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${this.task.id}`,
        method: "DELETE",
        headers: {
          access_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.fetchTasks();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    toEditForm() {
      this.isEdit = true;
      this.edit_task = this.task.title;
      this.edit_description = this.task.description;
    },
    UpdateTask() {
      const access_token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${this.task.id}`,
        method: "PUT",
        headers: {
          access_token
        },
        data: {
          task: this.edit_task,
          description: this.edit_description
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.fetchTasks();
          this.isEdit = false;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    inputUsername(){
        const username = localStorage.getItem('username')
        this.username = username
    },
  },
  computed: {
    markAs() {
      let toCategory = this.categoryName;
      if (toCategory === "Back Log") {
        toCategory = "Todo";
      } else if (toCategory == "Todo") {
        toCategory = "Doing";
      } else if (toCategory == "Doing") {
        toCategory = "Done";
      } else {
        toCategory = "finish";
      }
      return toCategory;
    }
  },
  created(){
    this.inputUsername()
  }
};
</script>


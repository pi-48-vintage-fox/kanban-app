<template>
  <div class="px-6 py-4 bg-white p-10 m-3 card-task">
    <div class="container-row">
      <div class="container-row" id="editTask" @click="openEditor">
        <p class="text-xs text-gray-500	">edit</p>
      </div>

      <div class="container-row" id="deleteTask" @click="deleteTask">
        <p class="text-xs text-gray-500	">delete</p>
      </div>
    </div>
    <div class="font-bold text-base mb-2">
      <p> {{ task.title }} </p>
    </div>
    <p class="text-gray-600 text-xs">By : {{task.User.name}}</p>
    <p class="text-gray-600 text-xs">{{new Date(task.createdAt).toDateString()}}</p>

    <form @submit.prevent="editTask" v-if="updateTask" class="bg-pink-100 flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2">
      <textarea id="card-edit" v-model="valForUpdateTask" placeholder="Enter task" class="overflow-auto bg-pink-100">
      </textarea>
      <div>
        <label for="edit">Move To:</label>
        <select name="categoryTask" v-model="categoryTask" class="bg-pink-100">
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit
        Task</button>
      <button @click.prevent="openEditor"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
  name: 'kanbanList',
  props: ['task', 'baseUrl', 'type'],
  data () {
    return {
      updateTask: false,
      valForUpdateTask:'',
      categoryTask: this.task.category.toLowerCase(),
    }
  },
  methods: {
    editTask() {
      const id = this.task.id
      axios({
          method: 'PUT',
          url: this.baseUrl + `/tasks/${id}`,
          data: {
            category: this.categoryTask,
            title: this.valForUpdateTask
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(res => {
          swal("Success", "Edit task Success!", "success");
          this.$emit('fetchTasks')
          this.updateTask = false
        })
        .catch(err => {
          swal("Not Allowed!", "You can't edit file other than yours!", "error");
        })
    },
    deleteTask() {
      const category = this.type
      const id = this.task.id
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this task!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios({
                method: 'DELETE',
                url: this.baseUrl + `/tasks/${id}`,
                headers: {
                  access_token: localStorage.access_token
                }
              })
              .then(res => {
                this.$emit('fetchTasks')
                swal("Poof! Your task has been deleted!", {
                  icon: "success",
                });
              })
              .catch(err => {
                swal("Not Allowed!", "Not Allowed to delete this file!", "error");
              })
          } else {
            swal("Cancel delete!");
          }
        });
    },
    openEditor() {
      this.updateTask = !this.updateTask
      this.valForUpdateTask = this.task.title
    }
  }
}
</script>

<style scoped>
  #editTask{
    fill:darkslateblue;
  }
  #editTask:hover{
    fill:burlywood;
    color: burlywood;
    cursor: pointer;
  }
  #deleteTask{
    fill: red;
  }
  #deleteTask:hover{
    fill: chocolate;
    cursor: pointer;
  }
  .card-task:hover {
    cursor: pointer;
    box-shadow: -2px -1px 18px -6px rgba(161,155,161,1);
  }
</style>
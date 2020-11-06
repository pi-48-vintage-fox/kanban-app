<template>
<div>
  <div v-if="!editMode" class="card-body">
    <h5 class="card-title">{{task.title}}</h5>
    <hr />
    <p class="card-text">{{task.description}}</p>
    <p class="text-muted">Created at : {{getDate(`${task.createdAt}`)}}</p>
    <hr />
    
    <div class="d-flex justify-content-between">
      <div v-if="task.UserId === +currentId" class="btn-group">
        <button class="btn dropdown-toggle text-primary m-0 p-0" type="button" id="ex2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-exchange-alt"></i>
        </button> 
        <div class="dropdown-menu dropdown-menu-left" aria-labelledby="ex2">
          <button v-for="cat in categories" :key="cat.id" @click.prevent="patchCategory(`${cat.name}`)" class="dropdown-item" type="button">{{cat.name}}</button>
        </div>
      </div>
      <div class="text-muted">
        <p class="text-center">By : {{task.User.email}}</p>
      </div>
      <div v-if="task.UserId === +currentId">
        <a @click.prevent="editTask" href="#">
          <i class="fas fa-edit"></i>
        </a>
        <a @click.prevent="deleteTask" href="#">
          <i class="fas fa-trash-alt"></i>
        </a>
      </div>
    </div>
    
  </div>
  <div v-else class="card-body bg-white">
    <form>
        <div class="form-group">
            <label for="title">Title</label>
            <input v-model="title" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Task Title">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input v-model="description" type="text" class="form-control" id="description" placeholder="Description...">
        </div>
        <button @click.prevent="postEdit" type="submit" class="btn btn-primary form-control">Edit</button>
        <button @click.prevent="cancelEdit" type="butoon" class="btn btn-primary form-control">Cancel</button>
    </form>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "../config/axios"
export default {
  name: "TaskComponent",
  data(){
      return {
          editMode : false,
          id : this.task.id,
          title : '',
          description : '',
          category: '',
      }
  },
  props : ['task','currentId','cat','fetchTasks','categories'],
  methods : {
      editTask(){
          this.editMode = true
          this.title = this.task.title
          this.description = this.task.description
      },
      postEdit(){
        axios({
          url : `/tasks/${this.id}`,
          method : 'PUT',
          data : {
            title : this.title,
            description : this.description,
            category : this.cat.name
          },
          headers : {access_token : localStorage.access_token}
        })
        .then(result=>{
          Swal.fire(
            'DONE',
            `Change Saved`,
            'success'
          )
          this.cancelEdit()
          this.fetchTasks()
        })
        .catch(err=>{
          Swal.fire(
            'ERROR',
            `${err.response.data.msg}`,
            'error'
          )
        })
      },
      cancelEdit(){
          this.editMode = false
          this.title = ''
          this.description = ''
      },
      patchCategory(value){
        axios({
          url : `/tasks/${this.id}`,
          method : 'PATCH',
          data : {
            category : value
          },
          headers : {access_token : localStorage.access_token}
        })
        .then(result=>{
          Swal.fire(
            'DONE',
            `Task moved to ${value} tasks`,
            'success'
          )
          this.fetchTasks()
        })
        .catch(err=>{
          Swal.fire(
            'ERROR',
            `${err.response.data.msg}`,
            'error'
          )
        })

      },
      deleteTask(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios({
              url : `/tasks/${this.id}`,
              method : 'DELETE',
              headers : {access_token : localStorage.access_token}
            })
            .then(result=>{
              Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
              this.fetchTasks()
            })
            .catch(err=>{
              Swal.fire(
                'ERROR',
                `${err.response.data.msg}`,
                'error'
              )
            })
          }
        })
      },
      getDate(date){
      let tanggal = date.split("T")[0]
      return tanggal
    }
  }
};
</script>

<style>
</style>
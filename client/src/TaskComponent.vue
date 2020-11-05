<template>
<div>
  <div v-if="!editMode" class="card-body">
    <h5 class="card-title">{{task.title}}</h5>
    <hr />
    <p class="card-text">{{task.description}}</p>
    <p class="text-muted">Created at : {{task.createdAt}}</p>
    <hr />
    <!-- Button Control -->
    <div class="d-flex justify-content-between">
      <div v-if="task.UserId === +currentId">
        <a href="#"><i class="fas fa-chevron-circle-left"></i></a>
        <a href="#"><i class="fas fa-chevron-circle-right"></i></a>
      </div>
      <div class="text-muted">
        <p class="text-center">By : {{task.User.email}}</p>
      </div>
      <div v-if="task.UserId === +currentId">
        <a @click.prevent="editTask" href="#">
          <i class="fas fa-edit"></i>
        </a>
        <a href="#">
          <i class="fas fa-trash-alt"></i>
        </a>
      </div>
    </div>
    <!-- Button Control End -->
  </div>
  <div v-else class="card-body bg-white">
    <form>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Task Title">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" placeholder="Description...">
        </div>
        <button type="submit" class="btn btn-primary form-control">Edit</button>
        <button @click.prevent="cancelEdit" type="butoon" class="btn btn-primary form-control">Cancel</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "TaskComponent",
  data(){
      return {
          editMode : false
      }
  },
  props : ['task','currentId'],
  methods : {
      editTask(){
          this.editMode = true
      },
      cancelEdit(){
          this.editMode = false
      }
  }
};
</script>

<style>
</style>
<template>
  <div class="card-body">
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
</template>

<script>
export default {
  name: "TaskComponent",
  props : ['task','currentId']
};
</script>

<style>
</style>
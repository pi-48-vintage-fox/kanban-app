<template>
    <div class="card-body border-bottom">
      <h5 class="card-title">{{task.title}}</h5>
      <p class="card-text">{{task.description}}</p>
      <a href="#" class="btn btn-outline-primary">Edit</a>
      <a href="#" class="btn btn-outline-danger">Delete</a>
    </div>
</template>

<script>
export default {
  name: "Card",
  props: [ "task" ]
};
</script>

<style>
</style>
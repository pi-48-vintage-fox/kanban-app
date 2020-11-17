<template>
<div>

<!--Navbar -->
<nav class="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
  <a class="navbar-brand" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active mr-2">
        <a class="nav-link" href="#">New Task
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item active mr-2">
        <a class="nav-link" href="#">Register
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item active mr-2">
        <a class="nav-link" href="#">Login
          <span class="sr-only">(current)</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
<!--/.Navbar -->
  <div class="container-fluid pt-3">
    <h3 class="font-weight-light text-white fab fa-7x">Kanban Board</h3>
    <div class="row flex-row flex-sm-nowrap py-3">
    <Category
    v-for="(cat, i) in categories"
    :key = "i"
    :categor="cat"
    :tasks="tasks"
    ></Category>
    </div>
  </div>
</template>

<script>
import Category from "./Category";
export default {
  name: "HomePage",
  components: {
    Category,
  },
  props: ["task", "categories"],
};
</script>

<style>
</style>
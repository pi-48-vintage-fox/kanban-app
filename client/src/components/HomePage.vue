<template>
<div>

<!--Navbar -->
<nav class="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
    aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
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
      :key="i"
      :categories="cat">
      </Category>
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
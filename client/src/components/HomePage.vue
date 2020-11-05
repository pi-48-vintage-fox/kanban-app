<template>
  <section id="homepage">
    <nav class="navbar navbar-expand-lg navbar-light bg-custom-tp">
      <a class="navbar-brand" href="#">KanBar</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Add Task</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button
          class="btn btn-outline-dark my-2 my-sm-0"
          type="submit"
          @click="page = 'login-page'"
        >
          Log out
        </button>
      </form>
    </nav>
    <div id="content-section" class="container">
      <div class="row mt-4">
        <Category 
          v-for="(cat, i) in categories"
          :key="i"
          :categoryTitle="cat"
        ></Category>
      </div>
    </div>
  </section>
</template>

<script>
import Category from './Category'
export default {
  name: 'HomePage',
  components: {
    Category
  },
  props: [ 'categories' ]
};
</script>

<style>
</style>
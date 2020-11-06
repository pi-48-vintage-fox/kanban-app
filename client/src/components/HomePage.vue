<template>
  <div class="container-fluid pt-3">
    <h3 class="font-weight-light text-white fab fa-7x">Kanban Board</h3>
    <div class="row flex-row flex-sm-nowrap py-3">
      <Category 
      v-for="(cat, i) in categories" 
      :key="i"
      :descDetail="cat">
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
  props: ["categories"],
};
</script>

<style>
</style>
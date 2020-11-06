<template>
  <div class="col-3">
    <div class="card">
      <h5 class="card-header">{{ categoryTitle.name }}</h5>
      <Card v-for="task in taskPerCat" :key="task.id" :task="task"></Card>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
export default {
  name: "Category",
  components: {
    Card,
  },
  props: [ "categoryTitle", "tasks" ],
  computed: {
    taskPerCat() {
      return this.tasks.filter(task => task.category == this.categoryTitle.name)
    }
  }
};
</script>

<style>
</style>
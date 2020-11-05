<template>
  <div class="col-3">
    <div class="card">
      <h5 class="card-header">{{ categoryTitle.name }}</h5>
      <Card></Card>
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
  props: ["categoryTitle"],
};
</script>

<style>
</style>
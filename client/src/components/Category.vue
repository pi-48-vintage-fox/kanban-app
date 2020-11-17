<template>
  <div class="col-sm-6 col-md-4 col-xl-3">
    <div class="card bg-light">
      <div class="card-body">
        <h6 class="card-title text-uppercase text-truncate py-2">{{ categories.data[0].name }}</h6>
        <div class="items border border-light">
          <Description></Description>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Description from "./Description";
export default {
  name: "Category",
  components: {
    Description,
  },
  props: ["categories"],
  mounted() {
    console.log(this.categories, "<<< ini dari category.vue");
  }
};
</script>

<style>
</style>
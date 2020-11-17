<template>
  <div class="col-sm-6 col-md-4 col-xl-3">
    <div class="card bg-light">
      <div class="card-body">
        <h3 class="card-title text-uppercase text-truncate py-2">
          {{ categor.name }}
        </h3>
        <div class="items border border-light">
          <Description
            v-for="(task, i) in categor.Tasks"
            :key="i"
            :tasks="task"
            @kirimTaskUntukEdit="kirimDataTaskUntukEdit"
          ></Description>
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
  props: ["categor"],
  mounted() {
    console.log(this.categor, "<<< ini dari category.vue");
  },
  methods: {
    kirimDataTaskUntukEdit(tasks) {
      this.$emit("kirimTaskUntukEdit", tasks);
    },
  },
};
</script>

<style>
</style>
<template>
  <div class="card" style="margin-top: 10px; border-radius: 10px">
    <div class="card-body">
      <h5 class="card-title">{{ tasks.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ tasks.updatedAt.split("T")[0] }}
      </h6>
      <p class="card-text">
        {{ tasks.description }}
      </p>
      <a href="#" @click.prevent="toEditPage" class="card-link">Edit</a>
      <a href="#" @click.prevent="toDelete" class="card-link">Delete</a>
      <a href="#" @click.prevent="toEditCategory" class="card-link">Move</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["tasks"],
  methods: {
    toEditPage() {
      let payload = {
        id: this.tasks.id,
        name: "edit-page",
      };
      console.log(this.tasks.id);
      this.$emit("toEditPage", payload);
    },

    toDelete(){
      let payload = {
        id: this.tasks.id,
      }
      this.$emit("toDelete", payload)
    },
    
    toEditCategory() {
      let payload = {
        id: this.tasks.id,
        name: "edit-category"
      };
      console.log(this.tasks.id);
      this.$emit("toEditCategory", payload);
    },
  },
};
</script>

<style>
</style>
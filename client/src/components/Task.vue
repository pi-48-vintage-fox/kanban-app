<template>
  <div class="card" style="border-radius: 5px">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ task.updatedAt.split("T")[0] }}
      </h6>
      <p class="card-text">
        {{ task.description }}
      </p>
      <a href="#" @click.prevent="toEditPage" class="card-link"
        ><i class="far fa-edit"></i
      ></a>
      <a href="#" @click.prevent="toDelete" class="card-link"
        ><i class="fas fa-trash-alt"></i
      ></a>
      <a href="#" @click.prevent="toEditCategory" class="card-link"
        ><i class="fas fa-arrows-alt"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["categoryDetail", "task"],
  methods: {
    toEditPage() {
      let payload = {
        id: this.task.id,
        name: "edit-page",
      };
      this.$emit("toEditPage", payload);
    },

    toDelete() {
      let payload = {
        id: this.task.id,
      };

      this.$emit("toDelete", payload);
    },

    toEditCategory() {
      let payload = {
        id: this.task.id,
        name: "edit-category",
      };
      this.$emit("toEditCategory", payload);
    },
  },
  created() {
    console.log(this.task, "<<<<<< ini task.vue");
  },
};
</script>

<style>
</style>
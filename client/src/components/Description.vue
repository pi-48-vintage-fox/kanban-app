<template>
  <div class="card mt-3">
    <div class="card-body p-2 ml-2">
      <div class="card-title justify-content-center">
        <h1 class="lead font-weight-light">{{ tasks.title }}</h1>
      </div>
      <p>{{ tasks.tag }}</p>
      <button @click="editPage(tasks)" class="btn btn-primary btn-sm">
        Edit
      </button>
      <button
        @click="movePage(tasks.id)"
        class="btn btn-success btn-sm"
      >
        Move
      </button>
      <button
        @click="deletePage(tasks.id)"
        class="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["tasks"],
  methods: {
    editPage(tasks) {
      this.$emit("kirimTaskUntukEdit", tasks);
    },

    deletePage(id) {
      this.$emit("deleteTasks", id);
    },

    movePage(id) {
      this.$emit("editCategory", id);
    },
  },
};
</script>

<style>
</style>
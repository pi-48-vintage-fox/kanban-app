<template>
  <div>
    <form>
      <div class="form-group">
    <label for="exampleFormControlSelect1">Category</label>
    <select class="form-control" id="exampleFormControlSelect1" v-model="task.category">
      <option>Backlog</option>
      <option>Todo</option>
      <option>Doing</option>
      <option>Done</option>
    </select>
  </div>
      <button type="button" @click.prevent="submitCategoryForm" class="btn btn-primary mb-2">
        Edit
      </button>
      <button type="button" @click="closeCategoryForm" class="btn btn-primary mb-2">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditTask",
  props: ['task'],
  data() {
    return {
      payload: {
        title: "",
        description: "",
        category: this.categoryName,
      },
    };
  },
  methods: {
    submitCategoryForm() {
      this.$emit("submitCategoryForm", this.payload);
    },
    closeCategoryForm() {
      this.$emit("closeCategoryForm", false);
    },
  },
};
</script>

<style>
</style>
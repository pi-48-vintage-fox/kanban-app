<template>
  <div>
    <form>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Category</label>
        <select class="form-control" id="category" v-model="category">
          <option value="Backlog">Backlog</option>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        type="button"
        class="btn btn-primary mb-2"
        @click="submitCategoryForm"
      >
        Edit
      </button>
      <button
        type="button"
        @click="closeCategoryForm"
        class="btn btn-primary mb-2"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditTask",
  props: ["task"],
  data() {
    return {
      category: "",
    };
  },
  methods: {
    submitCategoryForm() {
      this.task.category = this.category;
      this.$emit("submitCategoryForm", this.task);
    },
    closeCategoryForm() {
      this.$emit("closeCategoryForm", false);
    },
  },
};
</script>

<style>
</style>
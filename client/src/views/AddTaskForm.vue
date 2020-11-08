<template>
  <div>
    <form>
      <div class="form-group">
        <label for="title" class="text-task"><b>Title</b></label>
        <input type="text" class="form-control" id="title" v-model="payload.title" />
      </div>
      <div class="form-group">
        <label for="description" class="text-task"><b>Description</b></label>
        <textarea
          type="text"
          class="form-control"
          id="description"
          rows="5"
          v-model="payload.description"
        />
      </div>
      <button type="button" @click="submitAddForm" class="btn btn-primary mb-2">
        Submit
      </button>
      <button type="button" @click="closeAddForm" class="btn btn-primary mb-2">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  props: ["categoryName"],
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
    submitAddForm() {
      this.$emit('submitAddForm',this.payload)
    },
    closeAddForm() {
      this.payload.title = "";
      this.payload.category = "";
      this.$emit("closeAddForm", false);
    },
  },
};
</script>

<style>
</style>
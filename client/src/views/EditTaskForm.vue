<template>
  <div>
    <form>
      <div class="form-group">
        <label for="title" class="text-task"><b>Title</b></label>
        <input type="text" class="form-control" id="title" v-model="task.title"/>
      </div>
      <div class="form-group">
        <label for="description" class="text-task"><b>Description</b></label>
        <textarea type="text" class="form-control" id="description" rows="5" v-model="task.description"/>
      </div>
      <button
        type="button"
        @click.prevent="submitEditForm"
        class="btn btn-primary mb-2"
      >
        Submit
      </button>
      <button type="button" @click="closeEditForm" class="btn btn-primary mb-2">
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
    };
  },
  methods: {
    submitEditForm() {
      this.$emit("submitEditForm", this.task);
    },
    closeEditForm() {
      this.$emit("closeEditForm", false);
    },
  },
};
</script>

<style>
</style>
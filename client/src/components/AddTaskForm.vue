<template>
  <div class="container-fluid">
    <div class="row">
      <form @submit.prevent="addTask" id="add-task-form">
        <div class="form-group">
          <input v-model="taskPayload.title" type="text" name="input-task-title" id="inputTitle" placeholder="Input Title">
          <select v-model="taskPayload.category" name="categories" id="selectCategory">
            <option value="" selected default>--Select Category--</option>
            <option v-for="(category, i) in categories" :key="i" :value="category">{{ category }}</option>
          </select>
        </div>
        <button id="submit-add-task-form" class="btn btn-primary" type="submit">Add Task ?</button>
      </form>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTaskForm",
  data() {
    return {
      taskPayload: {
        title: '',
        category: ''
      }
    };
  },
  methods: {
    addTask() {
      this.$emit('addTask', this.taskPayload)
    },
  },
  props: [ 'chosenOrgId', 'categories' ],
  created() {
    this.taskPayload.OrganizationId = this.chosenOrgId
  }
};
</script>

<style>
</style>
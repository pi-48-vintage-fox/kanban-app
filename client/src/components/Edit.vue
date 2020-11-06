<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <form>
        <div class="form-group">
          <label for="task">New Task</label>
          <input v-model="edit_task" type="text" class="form-control" id="task">
        </div>
        <div class="form-group">
          <label for="textarea">Description</label>
          <textarea id="textarea" class="materialize-textarea" v-model="edit_description"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data () {
    return {
      edit_task : '',
      edit_description: ''
    }
  }
};
</script>

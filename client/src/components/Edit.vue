<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col mt-5 mb-4 ml-3">
        <img
            src="\svg\new.svg"
            class="mt-5 mr-5"
            alt=""
            style="width: 100%"
          />
      </div>
      <div class="col mt-2 mr-4 mb-2">
        <h3 class="mt-3" style="text-align: center">Edit Task</h3>
        <form @submit.prevent="editTask" class="mt-3 mr-3">
          <div class="form-group">
            <label>Title</label>
            <input
              type="text"
              class="form-control"
              v-model="title"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="description"
              rows="3"
            ></textarea>
          </div>
          <div class="d-flex justify-content-center mb-3">
            <button type="submit" class="btn btn-primary btn-block">Update</button>
          </div>
          <div class="d-flex justify-content-center mb-4">
            <button type="submit" class="btn btn-dark btn-block" 
            @click.prevent="$emit('client-page', 'homePage')"
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return { 
      title: this.detailTask.title,
      description: this.detailTask.description,
      baseUrl: "http://localhost:3000",
    }
  },
  props: [ 'detailTask' ],
  methods: {
    editTask() {
      let payload = {
        id: this.detailTask.id,
        title: this.title,
        description: this.description
      }
      this.$emit('editTask', payload)
    }
  }
}
</script>

<style>

</style>
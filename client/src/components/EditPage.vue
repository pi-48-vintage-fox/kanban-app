<template>
  <section class="container-fluid" id="editForm">
    <div class="row justify-content-center mt-5 text-white">
      <div class="col-4 fas">
        <h1 class="text-white fa-3x">Edit Form</h1>
        <form @submit.prevent="editPage">
          <div class="form-group">
            <label form="name">Title</label>
            <input
              v-model="title"
              type="text"
              id="req-name"
              class="form-control"
              placeholder="input your title"
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label form="name">Description</label>
            <input
              v-model="description"
              type="name"
              id="req-name"
              class="form-control"
              placeholder="input your description"
              autocomplete="name"
            />
          </div>
          <div class="form-group">
            <label for="inputState">Category</label>
            <select v-model="category" id="inputState" class="form-control">
              <option v-for="(task, i) in categories" :key="i">
                {{ task.name }}
              </option>
            </select>
          </div>
          <button class="btn btn-dark">Submit</button>
          <div class="justify-content-center"></div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EditPage",
  data() {
    return {
      title: '',
      description: '',
      category: ''
    }
  },
  props: ['taskUntukEdit', 'categories'],
  methods: {
    editPage() {
      let payload = {
        title: this.title,
        description: this.description,
        category: this.category
      }
      this.$emit('editPage', payload)
    }
  },
  created() {
    this.title = this.taskUntukEdit.title,
    this.description = this.taskUntukEdit.tag
  },
};
</script>

<style>
</style>
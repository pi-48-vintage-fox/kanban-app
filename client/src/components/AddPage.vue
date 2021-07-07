<template>
  <section class="container-fluid" id="addForm">
    <div class="row justify-content-center mt-5 text-white">
      <div class="col-4 fas">
        <h1 class="text-white fa-3x">Add Form</h1>
        <form @submit.prevent="addPage">
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
              v-model="tag"
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
              <option value="">Choose...</option>
              <option value="1">Backlog</option>
              <option value="2">Todo</option>
              <option value="3">Doing</option>
              <option value="4">Done</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <button class="btn btn-dark" @click.prevent="toHome">Back</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AddPage",
  data() {
    return {
      title: "",
      tag: "",
      category: "",
    };
  },
  methods: {
    addPage() {
      console.log('masuk sini kaga');
      let payload = {
        title: this.title,
        tag: this.tag,
        category: this.category,
      };
      this.$emit("addPage", payload);
    },

    toHome() {
      this.$emit("changePage", "home-page");
    },
  },
};
</script>

<style>
</style>
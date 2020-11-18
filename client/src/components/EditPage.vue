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
              <option 
              v-for="(task, i) in categories" 
              :key="i"
              >
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
import CategoryVue from './Category.vue';
export default {
  name: "EditPage",
  data() {
    return {
      title: "",
      tag: "",
      category: "",
      CategoryId: "",
    };
  },
  props: ["taskUntukEdit", "categories"],
  methods: {
    editPage() {
      let payload = {
        id: this.taskUntukEdit.id,
        title: this.title,
        tag: this.tag,
        category: this.CategoryId
      };
      this.$emit("editPage", payload);
    },

    inputCategory(task) {
      this.CategoryId = taks.id
      console.log('<<< ini Category Id');
    },
  },
  created() {
    this.title = this.taskUntukEdit.title
    this.tag = this.taskUntukEdit.tag
  },
};
</script>

<style>
</style>
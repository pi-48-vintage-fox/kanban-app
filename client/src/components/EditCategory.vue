<template>
  <section class="container-fluid" id="editForm">
    <div class="row justify-content-center mt-5 text-white">
      <div class="col-4 fas">
        <h1 class="text-white fa-3x">Edit Category</h1>
        <form @submit.prevent="editCategory">
          <div class="form-group">
            <label for="inputState">Category</label>
            <select v-model="CategoryId" id="inputState" class="form-control">
              <option v-for="(task, i) in categories" :key="i">
                  {{ task.name }}
              </option>
            </select>
          </div>
          <button class="btn btn-primary">Submit</button>
          <button class="btn btn-dark" @click.prevent="toHome">Back</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import CategoryVue from './Category.vue';
export default {
  name: "EditCategory",
  data() {
    return {
      CategoryId: "",
    };
  },
  props: ["categories", "taskId"],
  methods: {
    editCategory() {
      let arrCategory = this.categories.find((result) => {
        return result.name === this.CategoryId
      })

      if (arrCategory !== undefined) {
        let payload = {
          categoryId: arrCategory.id,
          taskId: this.taskId
        }
        this.$emit('changeCategory', payload)
      }
    //   let payload = {
    //   //   category: this.CategoryId
    //   // };
    //   // this.$emit("editCategory", payload);
    console.log(this.CategoryId, '<<< ini category id dari edit category');
    },

    toHome() {
      this.$emit("changePage", "home-page");
    }
  },
  created() {},
};
</script>

<style>
</style>
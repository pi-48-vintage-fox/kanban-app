<template>
  <section class="container-fluid" id="landing">
    <!-- <h1 v-text="msg"></h1> -->
    <div class="login-box done">
      <div class="row justify-content-center">
        <div class="col">
          <div class="row">
            <div class="col masuk">Edit Status</div>
          </div>
          <form @submit.prevent="editCategory()">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Status</label>
              <select class="form-control" v-model="category" id="exampleFormControlSelect1">
                <option value="2">Todo</option>
                <option value="3">Doing</option>
                <option value="4">Done</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Edit Status</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "edit-category",
  data() {
    return {
      category: "",
    };
  },
  methods: {
    editCategory() {
      let payload = {
        category: this.category,
      };
      this.$emit("editCategory", payload);
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div>
      <nav class="navbar">
        <a @click="backToHome" class="navbar-home">Kanban by Bimo</a>
        <div class="icons">
          <button @click="logout" type="button" class="btn btn-outline-danger">
            Logout
          </button>
        </div>
      </nav>
    </div>
    <section class="container-fluid" id="landing">
      <!-- <h1 v-text="msg"></h1> -->
      <div class="login-box done">
        <div class="row justify-content-center">
          <div class="col">
            <div class="row">
              <div class="col masuk">Edit Kanban</div>
            </div>
            <form @submit.prevent="editTasks()">
              <div class="form-group">
                <label for="edit-title">Title</label>
                <input type="text" v-model="title" class="form-control" />
              </div>
              <div class="form-group">
                <label for="edit-description">Description</label>
                <input type="text" v-model="description" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary">Edit Kanban</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "edit-page",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    editTasks() {
      let payload = {
        title: this.title,
        description: this.description,
      };
      this.$emit("editTasks", payload);
    },
    backToHome() {
      this.$emit("backToHome");
    },
  },
};
</script>

<style>
</style>
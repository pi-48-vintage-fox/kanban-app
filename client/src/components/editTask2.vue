<template>
  <section id="register-page">
    <h5>Edit assignment!</h5>

    <form class="form" @submit.prevent="editTask">
      <label style="padding-top: 13px"> &nbsp;Title </label>
      <input class="form-content" type="text" v-model="title" />
      <div class="form-border"></div>

      <label style="padding-top: 13px"> &nbsp;Description </label>
      <textarea
        class="form-content"
        type="text"
        v-model="description"
      ></textarea>
      <select class="custom-select" v-model="CategoryId">
        <option selected>Select Category</option>
        <option value="1">Backlog</option>
        <option value="2">Todo</option>
        <option value="3">Doing</option>
        <option value="4">Done</option>
      </select>

      <div class="form-border"></div>

      <input type="submit" name="submit" value="EDIT TASK" />
      <input @click="cancelEdit" value="CANCEL" />
    </form>
  </section>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "EditTask2",
  data() {
    return {
      title: this.task.title,
      description: this.task.description,
      CategoryId: this.task.CategoryId,
    };
  },
  methods: {
    cancelEdit() {
      this.$emit("cancelEdit");
    },
    editTask() {
      const token = localStorage.getItem("access_token");
      axios({
        url: `/tasks/${this.task.id}`,
        method: "put",
        data: {
          title: this.title,
          description: this.description,
          CategoryId: this.CategoryId,
        },
        headers: {
          access_token: token,
        },
      })
        .then((result) => {
          this.$emit("changePage", "kanban-homepage")
          this.$emit("fetchKanban");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  props: ["task"],
};
</script>

<style>
</style>
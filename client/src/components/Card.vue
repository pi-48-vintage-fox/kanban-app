<template>
  <div class="card-body border-bottom">
    <h5 class="card-title">{{ task.title }}</h5>
    <p class="card-text">{{ task.description }}</p>
    <a href="#" class="btn btn-outline-primary">Edit</a>
    <a href="#" class="btn btn-outline-danger" @click="deleteTask">Delete</a>
    <a href="#" class="btn btn-outline-success" @click="changeCat">Next</a>
  </div>
</template>

<script>
import axios from "../config/axios";
import swal from "sweetalert";
export default {
  name: "Card",
  props: ["task", "fetchTaskCard"],
  methods: {
    deleteTask() {
      axios({
        method: "DELETE",
        url: `/tasks/${this.task.id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data);
          this.fetchTaskCard();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeCat() {
      axios({
        method: "PATCH",
        url: `/tasks/${this.task.id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
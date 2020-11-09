<template>
  <section id="add-task" class="container al-cnt">
    <div class="d-flex justify-content-center" style="margin: 28px">
      <div class="bg-custom-tp px-5" style="border-radius: 5px; width: 400px">
        <form class="container mt-4" @submit.prevent="addTask">
          <div class="container text-center">
            <h1 class="h3 mb-3 font-weight-normal">Add Task</h1>
          </div>
          <div class="form-group">
            <label for="addTitle">Title</label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              id="addTitle"
              placeholder="e.g. Cook Rice"
            />
          </div>
          <div class="form-group">
            <label for="addDesc">Description</label>
            <textarea
              v-model="desc"
              type="email"
              class="form-control"
              id="addDesc"
              placeholder="e.g. For today's lunch"
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="addCat">Category</label><br />
            <select
              name="addCat"
              id="addCat"
              class="form-control"
              v-model="cat"
            >
              <option value="">- Select Category -</option>
              <option value="Backlog">Backlog</option>
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Add Task
          </button>
          <div class="mt-1 text-center">
            <a href="#" @click.prevent="$emit('hp-change', 'default')"
              >Back to homepage</a
            >
          </div>
          <p class="mt-5 mb-3 text-center text-muted">&copy; RizkyAkhid</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "AddTask",
  props: ["fetchTaskProps"],
  data() {
    return {
      title: "",
      desc: "",
      cat: "",
    };
  },
  methods: {
    addTask() {
      axios({
        method: "POST",
        url: "/tasks",
        data: {
          title: this.title,
          description: this.desc,
          category: this.cat,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          console.log("success!");
          this.fetchTaskProps();
          this.$emit("hp-change", "default");
          (this.title = ""), (this.desc = ""), (this.cat = "");
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
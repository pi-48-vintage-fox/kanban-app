<template>
  <section id="edit-task" class="container al-cnt">
    <div class="d-flex justify-content-center" style="margin: 28px">
      <div class="bg-custom-tp px-5" style="border-radius: 5px; width: 400px">
        <form class="container mt-4" @submit.prevent="">
          <div class="container text-center">
            <h1 class="h3 mb-3 font-weight-normal">Edit Task</h1>
          </div>
          <div class="form-group">
            <label for="editTitle">Title</label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              id="editTitle"
              placeholder="e.g. Cook Rice"
            />
          </div>
          <div class="form-group">
            <label for="editDesc">Description</label>
            <textarea
              v-model="desc"
              type="email"
              class="form-control"
              id="editDesc"
              placeholder="e.g. For today's lunch"
              cols="30"
              rows="2"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="editCat">Category</label><br />
            <select
              name="editCat"
              id="editCat"
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
            Update Task
          </button>
          <div class="mt-1 text-center">
            <a href="#" @click.prevent=""
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
export default {
  name: "EditTask",
  data() {
    return {
      title: "",
      desc: "",
      cat: ""
    }
  }
};
</script>

<style>
</style>
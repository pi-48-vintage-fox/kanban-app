<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col mt-5 mb-4 ml-3">
        <img
            src="\svg\new.svg"
            class="mt-5 mr-5"
            alt=""
            style="width: 100%"
          />
      </div>
      <div class="col mt-2 mr-4 mb-2">
        <h3 class="mt-3" style="text-align: center">Add Task</h3>
        <form @submit.prevent="addTask" class="mt-3 mr-3">
          <div class="form-group">
            <label for="exampleFormControlInput1">Title</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              v-model="title"
              placeholder="Title"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Category</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="category">
              <option value="" disabled hidden selected>Select your Category</option>
              <option>backlog</option>
              <option>todo</option>
              <option>doing</option>
              <option>done</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="description"
              rows="3"
            ></textarea>
          </div>
          <div class="d-flex justify-content-center mb-4">
          <button type="submit" class="btn btn-primary btn-block">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      title: '',
      category: '',
      description:'',
      baseUrl: "http://localhost:3000",
    }
  },
  method: {
    editTask(id) {
      axios({
        method: "PUT",
        url: `${this.baseUrl}/task/${+id}`,
        data: {
          title: this.title,
          category: this.category,
          description: this.description
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params: {
          id: +id,
        },
      })
        .then((response) => {
          this.title = ''
          this.category = ''
          this.description = ''
          swal.fire("DONE", "Change task success");
          this.fetch();

        })
        .catch((err) => {});
    },
  }
}
</script>

<style>

</style>
<template>
  <!-- Backlog -->
  <!-- <div> -->
    <!-- Edit -->
    <div class="col-3">
      <div class="category backlog text-white" :class="categoryName">
        {{ categoryName }}
      </div>
      <div class="card bg-light mb-0">
        <div class="title" v-for="task in taskFilter" :key="task.id">
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <p class="date mb-0">
              <small
                ><i>{{ task.createdAt }}</i></small
              >
            </p>
            <div class="card-footer icon">
              <i
                type="button"
                class="material-icons edit"
                data-toggle="modal"
                data-target="#editTask"
                data-whatever="edit"
                @click.prevent="editTask(task.id)"
                >edit</i
              >
              <i
                type="button"
                class="material-icons md-dark"
                @click.prevent="deleteTask(task.id)"
              >
                face</i
              >
              <i
                type="button"
                class="material-icons delete"
                @click.prevent="deleteTask(task.id)"
              >
                delete</i
              >
            </div>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
      
      <!-- Edit -->
      <div class="modal fade" id="editTask" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" style="text-align: center">Edit Task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editTask">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Title</label>
                  <input type="text" class="form-control" v-model="title" id="recipient-name">
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
                  <label for="message-text" class="col-form-label">Description:</label>
                  <textarea class="form-control" v-model="description" id="message-text"></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
import axios from "axios";
export default {
  name: "Category",
  data() {
    return {
      title: "",
      description: "",
      category: "",
      baseUrl: "http://localhost:3000",
      headers: {},
    };
  },
  props: ["categoryName", "tasks", "fetch"],
  methods: {
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

    patchTask(category, id) {
      axios({
        method: "PATCH",
        url: `${this.baseUrl}/task/${id}`,
        data: {
          category: category,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params: {
          id: +id,
        },
      })
        .then(response => {
          swal.fire(
            'DONE'
          )
          this.fetch();

        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `${this.baseUrl}/task/${+id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params: {
          id: +id,
        },
      })
        .then((response) => {
          this.fetch();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    taskFilter() {
      var dataTask = this.tasks.filter(
        (el) => el.category == this.categoryName
      );
      return dataTask;
    },
  },
};
</script>

<style>
</style>
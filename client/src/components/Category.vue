<template>

      <div class="col-3">
        <div>
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
                    @click.prevent="toEditPage(task.id, task.title, task.description)"
                    >edit</i
                  >
                  <i
                    type="button"
                    class="material-icons delete"
                    @click.prevent="deleteTask(task.id)"
                  >
                    delete</i
                  >
                  <i
                    type="button"
                    class="material-icons forward"
                    @click.prevent="patchTask(task.category, task.id)"
                  >
                    forward</i
                  >
                </div>
              </div>
            </div>
            <div class="card-footer"></div>
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
      isEdit: false,
      title: "",
      description: "",
      category: '',
      changeCategory: "",
      baseUrl: "http://localhost:3000",
      headers: {},
    };
  },
  props: ["categoryName", "tasks", "fetch"],
  methods: {

    toEditPage(id, title, description) {

      let payload = {
        page: 'editPage',
        id: id,
        title: title,
        description: description
      }
      this.$emit('toEditPage', payload)
    },

    // editTask(id) {
    //   axios({
    //     method: "PUT",
    //     url: `${this.baseUrl}/task/${+id}`,
    //     data: {
    //       title: this.title,
    //       description: this.description
    //     },
    //     headers: {
    //       access_token: localStorage.getItem("access_token"),
    //     },
    //     params: {
    //       id: +id,
    //     },
    //   })
    //     .then((response) => {
    //       this.title = ''
    //       this.category = this.task.category
    //       this.description = ''
    //       swal.fire("DONE", "Change task success");
    //       this.fetch();

    //     })
    //     .catch((err) => {});
    // },

    patchTask(newCategory, id) {
      if (newCategory == 'backlog') {
        newCategory = 'todo'
      } else if(newCategory == 'todo') {
        newCategory = 'doing'
      } else if(newCategory == 'doing') {
        newCategory = 'done'
      }
      axios({
        method: "PATCH",
        url: `${this.baseUrl}/task/${id}`,
        data: {
          category: newCategory,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(response => {
          if (response.category == 'done') {
            swal.fire(
            'Success',
            'Task is finished',
            'success'
            )
          } else {
            swal.fire(
              'Success',
              'Category update',
              'success'
            )
          }
          this.fetch();

        })
        .catch((err) => {
          swal.fire(
            'Failed',
            'Not your authorization',
            'error'
          )
        });
    },

    deleteTask(id) {
      axios({
        method: "DELETE",
        url: `${this.baseUrl}/task/${+id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          swal.fire(
            'Success',
            'Delete task success',
            'success'
          )
          this.fetch();
        })
        .catch(err => {
          swal.fire(
            'Failed',
            'Not your authorization',
            'error'
          )
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
    changeTask() {
      this.changeCategory = newCategory
    }

  },
};
</script>

<style>
</style>
<template>
  <div class="col-sm-3 col-auto">
    <div class="category my-5">
      <div class="head-category d-flex justify-content-between my-2">
        <h3>{{ category.name }}</h3>
        <button class="btn" type="button" @click="deleteCategory(category.id)">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
      <div class="card bg-content rounded-manual overflow-auto">
        <div class="card-body task-manual">
          <draggable :list="filterTaskByCat" group="task" @end="updateCategoryDrag" :id="category.id" :move="onMove">
            <Task
              v-for="task in filterTaskByCat"
              v-bind:key="task.id"
              :task="task"
              @deleteTask="deleteTask"
              @editTask="editTask"
              :categories="categories"
              @updateCatTask="updateCatTask"
              :id="task.id"
              class="animate__animated animate__backInDown animate__slower shadow"
              :conjunctions="conjunctions"
            >
            </Task>
          </draggable>
          <div class="card mb-4 rounded-manual button-add-another">
            <div class="d-flex justify-content-center h-100 mt-2">
              <div
                class=""
                v-if="category.id && category.id !== taskData.CategoryId"
              >
                <button class="btn" @click="formAdd(category.id)">
                  <h6 class="card-title py-2 px-3 rounded text-primary font-weight-bold">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill text-primary mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                    Add another task
                  </h6>
                </button>
              </div>
              <form
                action=""
                v-on:submit.prevent="addTask(category.id)"
                v-else-if="taskData.CategoryId === category.id"
              >
                <div class="form-group">
                  <label for="add-title-task">Title: </label>
                  <input
                    type="text"
                    class="form-control"
                    name="add-title-task"
                    id="add-title-task"
                    aria-describedby="helpId"
                    placeholder=""
                    v-model="taskData.title"
                  />
                </div>
                <div class="form-group">
                    <label for="add-description-task">Description: </label>
                    <input type="text" class="form-control" name="add-description-task" id="add-description-task" aria-describedby="helpId" placeholder="" v-model="taskData.description">
                </div>
                <input type="hidden" value="category.id" />
                <button class="btn btn-primary" type="submit">Add Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'

export default {
  name: "Category",
  data() {
    return {
      taskData: {
        id: "",
        title: "",
        description: "",
        CategoryId: ""
      },
      currTaskId: null,
      targetCatId: null
    };
  },
  components: {
    Task,
    draggable
  },
  methods: {
    formAdd(categoryId) {
      this.taskData.CategoryId = categoryId;
    },
    addTask(catId){
        const data = {
            title: this.taskData.title,
            description: this.taskData.description,
            CategoryId: catId,
        }
        this.$emit("addTask", data)
        this.taskData.CategoryId = ""
        this.taskData.title = ""
        this.taskData.description = ""
    },
    deleteTask(taskId){
        this.$emit("deleteTask", taskId)
    },
    editTask(data){
        this.$emit("editTask", data)
    },
    updateCatTask(data){
        this.$emit("updateCatTask", data)
    },
    updateCategoryDrag(){
      const payload = {
          id: this.currTaskId,
          CategoryId: this.targetCatId
      }
      this.$emit("updateCategoryDrag", payload)
      this.currTaskId = null
      this.targetCatId = null
    },
    onMove(e){
      this.currTaskId = +e.dragged.id
      this.targetCatId = +e.to.id
    },
    deleteCategory(id){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this category!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
        }).then((result) => {
        if (result.value) {
            Swal.fire(
            'Deleted!',
            'Your imaginary category has been deleted.',
            'success'
            )
            this.$emit("deleteCategory", id)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
            'Cancelled',
            'Your imaginary category is safe :)',
            'error'
            )
        }
      })
      
    }
  },
  computed: {
    filterTaskByCat() {
      let filter = this.tasks.filter((e) => {
        return e.CategoryId == this.category.id;
      });
      return filter;
    },
  },
  props: ["category", "tasks", "categories", "conjunctions"],
};
</script>

<style>
  .task-manual{
    max-height: 80vh;
    /* width: 100rem; */
  }
</style>

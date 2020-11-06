<template>
  <div id="home-page">
    <!-- Navbar -->
    <nav>
      <div class="nav-logo">
        <i
          ><a href="#" id="app-logo"
            ><img
              src="https://www.pngkit.com/png/detail/36-360519_penguin-penguin-logo-transparent.png"
              alt=""
            /><span>SNOWKAN</span></a
          ></i
        >
      </div>
      <div class="nav-logout">
        <button
          id="logout-button"
          class="btn btn-danger"
          @click.prevent="logout"
        >
          Logout
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div id="menu-organizations" class="container-fluid">
      <div class="form-group organizations-menu">
        <label for="organization-menu">Organization: </label>

        <select
          v-model="chosenOrgId"
          class="form-control input-organization"
          id="organization-menu"
        >
          <option @click="getCategories" value="0" disabled selected>
            Any
          </option>
          <Organization
            v-for="org in organizations"
            :key="org.id"
            @getCategories="getCategories"
            :org="org"
          ></Organization>
        </select>
      </div>
    </div>

    <div id="main-content" class="container-fluid">
      <div class="row board">
        <Category
          v-for="(category, i) in categories"
          @getTasks="getTasks"
          @deleteCategory="deleteCategory"
          @deleteTask="deleteTask"
          @editTask="editTask"
          @moveTask="moveTask"
          :key="i"
          :category="category"
          :categories="categories"
          :categoriesObj="categoriesObj"
          :tasks="tasks"
        ></Category>
        <div v-if="(chosenOrgId && orgChosed)" class="sub-board" id="add-board-category" @click.prevent="addCategory">
          <div class="content" id="content-category">
            <div>
              <svg width="10em" height="10em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>
          </div>
          <h3 id="text-add-category">Add Category</h3>
        </div>
      </div>
    </div>

    <AddTaskForm
      v-if="orgChosed"
      @addTask="addTask"
      :chosenOrgId="chosenOrgId"
      :categories="categories"
    ></AddTaskForm>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import AddTaskForm from "./AddTaskForm";
import Organization from "./Organization";
import Category from "./Category";
export default {
  name: "HomePage",
  data() {
    return {
      inputCategory: '',
      chosenOrgId: null,
    };
  },
  components: {
    AddTaskForm,
    Category,
    Organization,
  },
  methods: {
    addCategory() {
      Swal.fire({
        title: "Enter Category Name !",
        input: "text",
        inputLabel: "Category name",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      })
        .then(result => {
          
          if(!result.isConfirmed) {
            throw 'Err'
          }
          this.inputCategory = result.value
          this.$emit('addCategory', [this.inputCategory, this.chosenOrgId])
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTask(payload) {
      this.$emit("addTask", payload);
    },
    deleteCategory(categoryId) {
      console.log('sampe sini padahal')
      this.$emit("deleteCategory", [categoryId, this.chosenOrgId])
    },
    deleteTask(id) {
      this.$emit("deleteTask", id);
    },
    editTask(payload) {
      this.$emit("editTask", payload);
    },
    emptyCategories() {
      this.$emit("emptyCategories");
    },
    logout() {
      localStorage.clear();
      this.$emit("orgYetChosed");
      this.chosenOrgId = "";
      this.emptyCategories();
      this.$emit("ready");
    },
    moveTask(payload) {
      this.$emit("moveTask", payload);
    },
    getCategories() {
      this.$emit("getCategories", this.chosenOrgId);
    },
    getTasks() {
      this.$emit("getCategories", this.chosenOrgId);
    },
  },
  props: ["organizations", "categories", "tasks", "orgChosed", "categoriesObj"],
};
</script>

<style>
</style>
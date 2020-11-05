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
        
        <select v-model="chosenOrgId" class="form-control input-organization" id="organization-menu">
          <option @click="getCategories" value="0" default selected>Any</option>
          <Organization 
            v-for="org in organizations" :key="org.id"
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
          :key="i"
          :category="category"
          :tasks="tasks"
        ></Category>
        <!-- <div
            v-for="(category, i) in categories"
            :key="i"
          >
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Organization from "./Organization";
import Category from "./Category";
export default {
  name: "HomePage",
  data() {
    return {
      chosenOrgId: ''
    };
  },
  components: {
    Organization,
    Category,
  },
  methods: {
    logout() {
      localStorage.clear();
      this.chosenOrgId=''
      this.$emit("ready");
    },
    getCategories() {
      this.$emit("getCategories", this.chosenOrgId);
      // console.log(this.tasks)
    },
    getTasks() {
      this.$emit("getCategories", this.chosenOrgId);
    }
  },
  props: ["organizations", "categories", "tasks", "msg"],
};
</script>

<style>
</style>
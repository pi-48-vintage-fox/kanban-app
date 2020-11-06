<template>
  <div>
    <Login v-if="page == 'loginPage'" @client-page="changePage"></Login>

    <Register v-if="page == 'registerPage'" @client-page="changePage">
    </Register>

    <Home v-if="page == 'homePage'" @client-page="changePage"> </Home>

    <Add v-if="page == 'addPage'" @client-page="changePage"></Add>
  </div>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Add from "./components/Add"
export default {
  name: "App",
  data() {
    return {
      page: "loginPage",
    };
  },
  // Meregister component lain
  components: {
    Login,
    Home,
    Register,
    Add
  },

  methods: {
    changePage(value) {
      this.page = value;
    },
  },

  created() {
    if (localStorage.access_token) {
      this.page = "homePage";
    } else {
      this.page = "loginPage";
    }
  },
};
</script>

<style scoped>
</style>
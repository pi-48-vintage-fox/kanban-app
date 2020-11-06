<template>
  <nav class="navbar navbar-expand-lg bg-color-navbar flex-between">
    <ul class="navbar-nav">
      <li class="nav-item mx-2" v-show="page === 'tasks'">
        <a class="text-color font-1  nav-link" type="button" @click.prevent="home">Home</a>
      </li>
      <li class="nav-item mx-2">
        <a class="text-color font-1  nav-link" type="button">add Kanban</a>
      </li>
    </ul>
    <ul class="navbar-nav">
      <li class="nav nav-item mx-2" v-show="page !== 'tasks'">
        <a class="text-color nav-link font-1" type="button" @click.prevent="register"
          >Register</a
        >
      </li>
      <li class="nav-item mx-2" v-show="page !== 'tasks'">
        <a class="text-color nav-link font-1" type="button" @click.prevent="login">Login</a>
      </li>
      <li class=" mx-2" v-show="page === 'tasks'">
        <a class="text-color nav-link font-1" type="button" @click.prevent="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import GSignInButton from "vue-google-signin-button";
export default {
  name: "Navbar",
  props: ["page"],
  methods: {
    home() {
      this.$emit("changePage", "tasks");
    },
    login() {
      this.$emit("changePage", "login");
    },
    register() {
      this.$emit("changePage", "register");
    },
    logout() {
      this.$emit("changePage", "login");
      localStorage.clear();
      var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    },
  },
};
</script>

<style>
</style>
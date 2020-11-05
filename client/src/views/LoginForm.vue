<template>
  <div class="container col-4 my-2">
    <form class="bg-color1 p-3" @submit.prevent="login">
      <h1 class="text-color col-4">Login</h1>
      <div>
        <label for="email" class="text-color font-1"
          ><b>Email address</b></label
        >
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          v-model="payload.email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="password" class="text-color font-1"><b>Password</b></label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="payload.password"
        />
      </div>
      <div class="col- 6">
        <button type="submit" class="btn btn-primary">login</button>
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      page: "login",
      payload: {},
    };
  },
  methods: {
    login() {
      this.$emit("login", this.payload);
    },
  },
};
</script>

<style>
</style>
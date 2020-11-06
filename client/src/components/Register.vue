<template>
  <div>
    <div class="container mt-5" style="width: 30%">
      <h5 style="text-align: center" class="mt-3">Register</h5>
      <form @submit.prevent="register" class="mt-3 ml-3 mr-3 mb-5">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div class="d-flex justify-content-center">
          <button
            type="submit"
            class="button-login text-white font-weight-bold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      baseUrl: "http://localhost:3000",
    };
  },
  methods: {
    register() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/register`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          this.email = "";
          this.password = "";
          this.$emit("client-page", "loginPage");
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
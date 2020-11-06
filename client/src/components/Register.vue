<template>
  <section id="register-page" class="container al-cnt">
    <div class="d-flex justify-content-center" style="margin: 28px">
      <div class="bg-custom-tp px-5" style="border-radius: 5px; width: 400px">
        <form @submit="register" class="container mt-4">
          <div class="container text-center">
            <img
              class="mb-4"
              src="../../img/logo.png"
              alt="Logo"
              width="72"
              height="72"
            />
            <h1 class="h3 mb-3 font-weight-normal">Registration Form</h1>
          </div>
          <div class="form-group">
            <label for="regName">Full Name</label>
            <input
              v-model="regName"
              type="text"
              class="form-control"
              id="regName"
              placeholder="e.g. David Ornestein"
            />
          </div>
          <div class="form-group">
            <label for="regEmail">Email</label>
            <input
              v-model="regEmail"
              type="email"
              class="form-control"
              id="regEmail"
              placeholder="e.g. ornestein@mail.us"
            />
          </div>
          <div class="form-group">
            <label for="regPassword">Password</label>
            <input
              v-model="regPassword"
              type="password"
              class="form-control"
              id="regPassword"
              placeholder="Type your password"
            />
          </div>
          <p id="reg-err-msg"></p>
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
          <div class="mt-1 text-center">
            <a href="#" @click="toLoginPage">Back to login page</a>
          </div>
          <p class="mt-5 mb-3 text-center text-muted">&copy; RizkyAkhid</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "Register",
  data() {
    return {
      regName: "",
      regEmail: "",
      regPassword: "",
    };
  },
  methods: {
    toLoginPage() {
      this.$emit("changePage", "login-page");
    },
    register() {
      axios({
        method: "POST",
        url: "/register",
        data: {
          name: this.regName,
          email: this.regEmail,
          password: this.regPassword,
        },
      })
        .then((data) => {
          this.$emit("changePage", "login-page");
          this.email = ''
          this.password = ''
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
};
</script>

<style>
</style>
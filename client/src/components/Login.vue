<template>
  <div>
    <div class="container mt-5">
      <div class="row justify-content-around">
        <!-- <div class="col-6 card p-3" style="box-shadow: 0px 6px 5px grey;"> -->
        <div class="col-7 mt-3 ml-3">
          <img
            src="\svg\logo-depan.svg"
            class="mt-4 mr-5"
            alt=""
            style="height: 90%"
          />
        </div>
        <div class="col mt-4">
          <div class="d-flex justify-content-center">
            <h5 class="logo-depan font-italic mb-0">
              kaB<u class="u-depan">an</u>
            </h5>
          </div>
          <div class="d-flex justify-content-center">
            <p class="font-weight-light">Helps record your assignments</p>
          </div>
          <div class="d-flex justify-content-center">
            <p class="font-weight-normal">Login</p>
          </div>

          <form @submit.prevent="login" class="mt-0 mr-4">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                v-model="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
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
                Login
              </button>
            </div>
          </form>
          <div class="row mt-4 mr-3">
            <div class="col justify-content-center">
              <hr />
            </div>
            <div class="col">
              <p style="text-align: center">OR</p>
            </div>
            <div class="col">
              <hr />
            </div>
          </div>
          <div class="d-flex justify-content-end mr-4">
            <button type="button" class="btn btn-light" style="text-align: end"
            @click="$emit('client-page', 'registerPage')"
            >Create Account ?</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      baseUrl: "http://localhost:3000",
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          const access_token = response.data.access_token;
          localStorage.setItem("access_token", access_token);
          this.email = ''
          this.password = ''
          this.$emit('client-page', 'homePage')
        })
        .catch(err => {
          console.log(err);
          swal.fire(`${err}`)
          this.$emit('client-page', 'loginPage')
        });
    },
  },
};
</script>

<style>
</style>
<template>
  <div id="register" class="container">
    <div class="row">
      <div class="col" style="padding: 0">
        <button
          @click="$emit('change-page','login-page')"
          type="button"
          class="btn btn-primary btn-block active"
        >
          Login
        </button>
      </div>
      <div class="col" style="padding: 0">
        <button
          @click="$emit('change-page','register-page')"
          type="button"
          class="btn btn-primary btn-block"
        >
          Register
        </button>
      </div>
    </div>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="register-email">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="register-email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="register-password">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="register-password"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn btn-outline-primary btn-block">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "../config/axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      axios({
        method: "post",
        url: "/register",
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((result) => {
          console.log(result.data,"<<ini berhasil register");
          this.$emit('change-page','login-page')
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          Swal.fire(
            'ALERT',
            `${error.response.data.msg}`,
            'error'
          )
        });
    },
  },
  props: []
};
</script>

<style>
</style>
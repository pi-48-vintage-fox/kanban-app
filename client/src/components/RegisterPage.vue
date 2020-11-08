<template>
  <section id="register-page">
    <div id="card">
      <div id="card-content">
        <div id="card-title">
          <h5>Register your account here!</h5>
        </div>
        <form @submit.prevent="registerUser" class="form">
          <label for="user-email" style="padding-top: 13px">
            &nbsp;Full-name
          </label>
          <input v-model="full_name" class="form-content" type="text" />
          <div class="form-border"></div>
          <label for="user-email" style="padding-top: 13px">
            &nbsp;Email
          </label>
          <input v-model="email" class="form-content" type="email" />
          <div class="form-border"></div>
          <label for="user-password" style="padding-top: 22px"
            >&nbsp;Password
          </label>
          <input
            v-model="password"
            class="form-content"
            type="password"
            name="password"
            required
          />
          <div class="form-border"></div>
          <input id="submit-btn" type="submit" name="submit" value="REGISTER" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "RegisterPage",
  data() {
    return {
      full_name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    registerUser() {
      let dataUser = {
        full_name: this.full_name,
        email: this.email,
        password: this.password,
      };
      axios({
        url: "/register",
        method: "post",
        data: dataUser,
      })
        .then((response) => {
          this.$emit("changePage", "login-page");
        })
        .catch((err) => {
          console.log(err.response.messages);
        });
    },
  },
};
</script>

<style>
</style>
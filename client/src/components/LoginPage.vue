<template>
  <section id="login-page">
    <h1>KANBAN TASK MANAGEMENT</h1>
    <div id="card">
      <div id="card-content">
        <div id="card-title">
          <h2>LOGIN</h2>
          <div class="underline-title"></div>
        </div>
        <form method="post" class="form" @submit.prevent="eventLogin">
          <label for="user-email" style="padding-top: 13px">
            &nbsp;Email
          </label>
          <input
            id="user-email"
            v-model="email"
            class="form-content"
            type="email"
            name="email"
            autocomplete="on"
            required
          />
          <div class="form-border"></div>
          <label for="user-password" style="padding-top: 22px"
            >&nbsp;Password
          </label>
          <input
            id="user-password"
            v-model="password"
            class="form-content"
            type="password"
            name="password"
            required
          />
          <div class="form-border"></div>
          <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
          <button @click.prevent="toRegisterPage">
            Don't have account yet?
          </button>
          <GoogleLogin
            :params="params"
            :onSuccess="onSuccess"
            :renderParams="renderParams"

          >
            Sign in with Google</GoogleLogin
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios";
import GoogleLogin from "vue-google-login";
export default {
  name: "LoginPage",
  props: ["login", "fetchKanban", "fetchCategories"],
  components: {
    GoogleLogin,
  },
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "8151078506-v5sdddttbvh5r3n74mm9ucjrqlso3qhv.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    eventLogin() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.login(payload);
    },
    toRegisterPage() {
      this.$emit("changePage", "register-page");
    },
    onSuccess(googleUser) {
      let { id_token } = googleUser.getAuthResponse();
      console.log(id_token);
      axios({
        url: "/googleLogin",
        method: "post",
        data: {
          token: id_token,
        },
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem("access_token", response.data.access_token)
        this.$emit("changePage", "kanban-homepage")
        this.fetchKanban()
        this.fetchCategories()
      })

      // This only gets the user information: id, name, imageUrl and email
    },
  },
};
</script>

<style>
</style>
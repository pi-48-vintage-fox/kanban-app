<template>
  <section class="container" id="login">
    <div class="row justify-content-center mt-5">
      <div class="col-4 fas">
        <h1 class="text-white">Login</h1>
        <form @submit.prevent="login" class="text-white">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="text"
              id="email"
              class="form-control"
              placeholder="input your email"
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="input your password"
              autocomplete="current-password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <button
            type="button"
            @click.prevent="toRegister"
            class="btn btn-success"
          >
            Register
          </button>
        </form>
        <GoogleLogin
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
          :onFailure="onFailure"
        ></GoogleLogin>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleLogin from "vue-google-login";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          "407146176632-mkifgn1cg29tmaiv0sgjte63j0jaef7g.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },

  components: {
    GoogleLogin,
  },

  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("login", payload);
    },

    toRegister() {
      this.$emit("changePage", "register-page");
    },

    onSuccess(googleUser) {
      var google_access_token = googleUser.getAuthResponse().id_token;
      this.$emit("GoogleLogin", google_access_token);

      // This only gets the user information: id, name, imageUrl and email
    },

    onFailure(err) {
      console.log("masuk err");
    },
  },

  component: {
    GoogleLogin,
  },
};
</script>

<style>
</style>
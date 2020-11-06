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
      <div>
        <div>
          <g-signin-button :params="googleSignInParams" @success="onSignIn">
            <img
              src="http://www.three.co.uk/hub/wp-content/uploads/Google-logo-1-resized.jpg"
              class="logo"
              alt="google"
            />
            Sign in
          </g-signin-button>
        </div>
        <div class="row">
          <div class="col-3"></div>
          <button type="submit" class="btn btn-success col-6 mt-2">
            login
          </button>
          <div class="col-3"></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
import GSignInButton from "vue-google-signin-button";
export default {
  name: "LoginForm",
  components: {
    GSignInButton,
  },
  data() {
    return {
      page: "login",
      payload: {},
      googleSignInParams: {
        client_id:
          "21177283159-on299n33tkcj9fnfu729tp4simrgj8l1.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    login() {
      this.$emit("login", this.payload);
    },
    onSignIn(googleUser) {
      var google_access_token = googleUser.getAuthResponse().id_token;
      Axios({
        method: "POST",
        url: `http://localhost:3000/googleLogin`,
        headers: {
          google_access_token,
        },
      })
        .then(({ data }) => {
          localStorage.access_token = data.access_token;
          this.$emit("googleLogin");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
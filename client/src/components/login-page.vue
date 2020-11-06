<template>
  <div class="container" id="login-page">
    <div class="auth-container">
      <div class="logo" style="transform: scale(1.5); margin-bottom: 1rem">
        <h2 class="kang">KANG</h2>
        <h2 class="bang">BANG</h2>
      </div>
      <div class="logo-sub">
        <p>Explode your Productivity!</p>
      </div>
      <div class="card auth-card shadow-sm" style="margin-top: 1rem">
        <form method="POST" @submit.prevent="login">
          <div class="input-group">
            <input
              type="text"
              name="email"
              class="full-width shadow-sm"
              id="email"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              name="password"
              class="full-width shadow-sm"
              id="password"
              placeholder="password"
              v-model="password"
            />
          </div>
          <button type="submit" class="btn btn-primary shadow-sm full-width">
            Sign In
          </button>
          <div class="divider"><hr /></div>
          <p style="margin-bottom: 5px">- Or -</p>
            <button type="button" v-google-signin-button="clientId" class="btn btn-success full-width"> 
              <i class="fab fa-google" style="margin-right:1rem"></i>
              Sign In with Google</button>
          <div class="divider" style="margin-top: 10px"><hr /></div>

          <p style="margin-top: 5px" class="text-sm">
            Didnt have acount ?
            <a href="#" class="link" @click="register">Sign up now</a>
          </p>
        </form>
      </div>
      <p class="author">Created by Mochamad Zulfikar</p>
    </div>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  name: "LoginPage",
  directives: {
    GoogleSignInButton,
  },
  data() {
    return {
      email: "",
      password: "",
      clientId: "11402457869-9pgk1mf2de5qikbojcl0ho5j22f3rubq.apps.googleusercontent.com",
    };
  },
  methods: {
    OnGoogleAuthSuccess(idToken) {
      let payload = {
        token : idToken
      }
      // Receive the idToken and make your magic with the backend
      this.$emit("oauthLoginSuccess",payload)
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("login", payload);
    },
    register() {
      this.$emit("changePage", { page: "Register" });
    },
  },
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
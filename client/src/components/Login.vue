<template>
  <div>
    <div class="container-login-page shadow bg-white rounded" v-if="isLoginPage">
      <div class="cont-log-page"></div>
      <div class="form-log-page">
        <div class="text-login mt-5">Login</div>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12 email-form">
                <input id="email" type="email" class="validate" v-model="email">
                <label for="email">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 password-form">
                <input id="password" type="password" class="validate" v-model="password">
                <label for="password">Password</label>
              </div>
            </div>
            <button
              class="btn waves-effect red darken-1"
              type="submit"
              name="action"
              style="width: 40%"
              @click.prevent="login"
            >Log In</button>
          </form>
        </div>
          <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
        <p class="text mt-5">
          Not a member yet?
          <a id="link" @click.prevent="toRegisterPage">Sign Up</a>
        </p>
      </div>
    </div>
    <Register v-else @toLoginPage="changeLoginPage"></Register>
  </div>
</template>

<script>
import "./style.css";
import M from "materialize-css";
import axios from "../config/axios";
import Register from "./Register";

export default {
  name: "Login",
  data() {
    return {
      message: "hello from login page",
      email: "",
      password: "",
      username: "",
      isLoginPage: true,
      clientId: '893562878002-5g9hg8d6s2ejsj2ggvji511univq3r8g.apps.googleusercontent.com'
    };
  },
  components: {
    Register
  },
  methods: {
    login() {
      axios({
        url: "/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password,
          
        }
      })
        .then(({ data }) => {
          console.log(data.username);

          (this.email = ""), (this.password = "");
          const username = data.username;
          localStorage.setItem("username", username);
          localStorage.setItem("access_token", data.access_token);
          this.$emit("login_success", true);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
     OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      // Receive the idToken and make your magic with the backend
      const google_access_token = idToken
      axios({
        url: '/google-login',
        method: 'POST',
        data: {
          google_access_token
        }
      })
        .then(({ data }) => {
          console.log(data.username);

          (this.email = ""), (this.password = "");
          const username = data.username;
          localStorage.setItem("username", username);
          localStorage.setItem("access_token", data.access_token);
          this.$emit("login_success", true);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
      OnGoogleAuthFail (error) {
      console.log(error)
    },
    toRegisterPage() {
      this.isLoginPage = false;
    },
    changeLoginPage(value){
        this.isLoginPage = value
    }
  }
};
</script>
<style>
.google-signin-button {
  color: white;
  background-color: blue;
  height: 15px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>


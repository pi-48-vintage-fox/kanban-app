<template>
  <div id="landing-page">
    <h1 class="display-1">SNOWKAN</h1>

    <!-- Login Page -->
    <div v-show="!isRegister" class="container" id="login-page">
      <div class="mus-body">
        <div class="login-card">
          <h1 class="display-4 text-muted text-center">Login</h1>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email: </label>
              <input
                v-model="loginPayload.email"
                class="form-control"
                type="email"
                name="email"
              />
              <small class="text-muted"
                >We will never share your email to anyone</small
              >
            </div>
            <div class="form-group">
              <label for="password">Password: </label>
              <input
                v-model="loginPayload.password"
                class="form-control"
                type="password"
                name="password"
              />
            </div>
            <div class="submit-login">
              <button class="btn border" type="submit">Login</button>
            </div>
            <hr />
            <div id="register-link">
              <p>
                Don't have any account?
                <span
                  ><a href="#" @click.prevent="showRegister"
                    >Register now</a
                  ></span
                >
              </p>
            </div>
          </form>
          <div class="google-button-area">
            <button v-google-signin-button="clientId" class="google-signin-button">
              <span class="buttonText">Google</span>
            </button>
          </div>
          <div class="or-statement">
            <small>Or sign in with google</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Page -->
    <div v-show="isRegister" class="container" id="register-page">
      <div class="mus-body">
        <div class="register-card">
          <h1 class="display-4 text-muted text-center">Register</h1>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="email">Email: </label>
              <input
                v-model="registerPayload.email"
                class="form-control"
                type="email"
                name="email"
              />
              <small class="text-muted"
                >We will never share your email to anyone</small
              >
            </div>
            <div class="form-group">
              <label for="password">Password: </label>
              <input
                v-model="registerPayload.password"
                class="form-control"
                type="password"
                name="password"
              />
            </div>
            <div class="submit-login">
              <button class="btn border" type="submit">Register</button>
            </div>
            <hr />
            <div id="cancel-link">
              <p>
                Already have an account?
                <span><a href="#" @click.prevent="hideRegister">Login</a></span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      clientId: "1059756750271-t7h05g062opp9q289223acc11q2ummlm.apps.googleusercontent.com",
      isRegister: false,
      loginPayload: {
        email: "",
        password: "",
      },
      registerPayload: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    hideRegister() {
      this.isRegister = false;
    },
    login() {
      this.$emit("login", this.loginPayload);
    },
    OnGoogleAuthSuccess(idToken) {
      this.$emit('googleLogin', idToken)
    },
    OnGoogleAuthFail(error) {
      console.log(error)
    },
    register() {
      this.$emit("register", this.registerPayload);
      this.hideRegister();
    },
    showRegister() {
      this.isRegister = true;
    },
  },
};
</script>

<style>
</style>
<template>
  <section class="container-fluid" id="landing">
    <div class="login-box done">
      <div class="row justify-content-center">
        <div class="col">
          <div class="row">
            <div class="col masuk">Masuk</div>
            <div class="col register-click" @click.prevent="toRegister">
              Register
            </div>
          </div>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input
                type="email"
                v-model="email"
                id="login-email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                class="form-control"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <span>Atau</span>
          <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
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
      let payload = {
        name: "register-page",
      };
      this.$emit("changePage", payload);
    },
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      this.$emit("OnGoogleAuthSuccess", idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
      this.$emit("OnGoogleAuthFail", error)
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
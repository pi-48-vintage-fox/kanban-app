<template>
  <div>
    <div>
      <nav class="navbar">
        <div>Kanban by Bimo</div>
      </nav>
    </div>
    <section class="container-fluid" id="landing">
      <div class="login-box box-transparan shadow">
        <div class="row justify-content-center">
          <div class="col">
            <div class="row">
              <div class="col masuk">Masuk</div>
              <a class="col register-click" @click.prevent="toRegister">
                Register
              </a>
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
              <button type="submit" class="btn btn-secondary login-icon">
                Login
              </button>
            </form>
            <div class="or-icon">--------------Or---------------</div>
            <button
              v-google-signin-button="clientId"
              class="btn btn-secondary google-icon login-icon"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      clientId: "975173380509-h06f7llsom0gs78k849snl62pkjvek1m.apps.googleusercontent.com"
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
      this.$emit("OnGoogleAuthSuccess", idToken);
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
      this.$emit("OnGoogleAuthFail", error);
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div>
      <nav class="navbar">
        <div>Kanban by Bimo</div>
      </nav>
    </div>
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
              <button type="submit" class="btn btn-primary login-icon">
                Login
              </button>
            </form>
            <div class="or-icon">--------------Or---------------</div>
            <button
              v-google-signin-button="clientId"
              class="btn btn-primary google-icon google-signin-button login-icon"
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
.google-signin-button {
  color: white;
  background-color: blanchedalmond;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
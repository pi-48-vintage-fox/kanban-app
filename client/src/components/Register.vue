<template>
  <div>
    <div>
      <nav class="navbar">
        <div>Kanban by Bimo</div>
      </nav>
    </div>
    <section class="container-fluid" id="register">
      <div class="login-box color-biru">
        <div class="row justify-content-center">
          <div class="col">
            <div class="row">
              <div class="col masuk">Register</div>
              <div class="col login-click" @click.prevent="toLogin">
                Back to Login
              </div>
            </div>

            <form @submit.prevent="register">
              <div class="form-group">
                <label form="name">Email</label>
                <input
                  type="email"
                  id="req-email"
                  class="form-control"
                  v-model="email"
                  autocomplete="email"
                />
              </div>
              <div class="form-group">
                <label form="password">Password</label>
                <input
                  type="password"
                  id="req-password"
                  class="form-control"
                  v-model="password"
                  autocomplete="current-password"
                />
              </div>
              <button class="btn btn-dark login-icon" type="submit">
                Register
              </button>
              <div class="justify-content-center"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("register", payload);
    },
    toLogin() {
      let payload = {
        name: "login-page",
      };
      this.$emit("changePage", payload);
    },
  },
};
</script>

<style>
</style>
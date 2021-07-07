<template>
  <section class="container-fluid" id="register">
    <div class="row justify-content-center mt-5 text-white">
      <div class="col-4 fas">
        <h1 class="text-white fa-3x">Register</h1>
        <form @submit.prevent="register">
          <div class="form-group">
            <label form="name">Email</label>
            <input
              v-model="email"
              type="email"
              id="req-email"
              class="form-control"
              placeholder="input your email"
              autocomplete="email"
            />
          </div>
          <div class="form-group">
            <label form="password">Password</label>
            <input
              v-model="password"
              type="password"
              id="req-password"
              class="form-control"
              placeholder="input your password"
              autocomplete="current-password"
            />
          </div>
          <button class="btn btn-dark">Register</button>
          <div class="justify-content-center"></div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      let paylod = {
        email: this.email,
        password: this.password,
      };
      this.$emit("register", paylod);
    },
  },
};
</script>

<style>
</style>
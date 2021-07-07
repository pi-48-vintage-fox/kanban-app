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
          <button class="btn btn-dark">Login</button>
        </form>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
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
        password: this.password
      }
      this.$emit('login', payload)
    }
  }
};
</script>

<style>
</style>
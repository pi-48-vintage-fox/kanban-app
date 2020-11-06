<template>
  <section id="login-page">
    <h1>KANBAN TASK MANAGEMENT</h1>
    <div id="card">
      <div id="card-content">
        <div id="card-title">
          <h2>LOGIN</h2>
          <div class="underline-title"></div>
        </div>
        <form method="post" class="form" @submit.prevent="eventLogin">
          <label for="user-email" style="padding-top: 13px">
            &nbsp;Email
          </label>
          <input
            id="user-email"
            v-model="email"
            class="form-content"
            type="email"
            name="email"
            autocomplete="on"
            required
          />
          <div class="form-border"></div>
          <label for="user-password" style="padding-top: 22px"
            >&nbsp;Password
          </label>
          <input
            id="user-password"
            v-model="password"
            class="form-content"
            type="password"
            name="password"
            required
          />
          <div class="form-border"></div>
          <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
          <a href="#" id="signup">Don't have account yet?</a>
          <!-- <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          >
            Continue with Google
          </button> -->
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LoginPage",
  props: ["login"],
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods : {
    eventLogin(){
      let payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
    }
  }
};
</script>

<style>
</style>
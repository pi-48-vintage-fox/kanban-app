<template>
  <section id="login-page" class="container al-cnt">
    <div class="d-flex justify-content-center" style="margin: 64px">
      <div class="bg-custom-tp px-5" style="border-radius: 5px">
        <form class="form-signin text-center mt-4" onsubmit="">
          <img
            class="mb-4"
            src="../../img/logo.png"
            alt="Logo"
            width="72"
            height="72"
          />
          <h1 class="h3 mb-3 font-weight-normal">Login to KanBar</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
          />
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
          <!-- <div class="mt-2">
          <div class="g-signin2" data-width="300" data-longtitle="true" data-onsuccess="onSignIn"></div>
        </div> -->
          <div class="mt-1">
            <a href="#">Don't have any account? Register here!</a>
          </div>
          <p id="login-err-msg"></p>
          <p class="mt-5 text-muted">&copy; RizkyAkhid</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style>
</style>
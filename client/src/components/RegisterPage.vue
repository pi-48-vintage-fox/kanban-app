<template>
  <section class="container-fluid" id="register">
    <div class="row justify-content-center mt-5 text-white">
      <div class="col-4 fas">
        <h1 class="text-white fa-3x">Register</h1>
        <form onsubmit="register(event)">
          <div class="form-group">
            <label form="name">Email</label>
            <input
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
};
</script>

<style>
</style>
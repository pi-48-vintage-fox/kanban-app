<template>
      <section class="container-fluid" id="landing">
      <div class="login-box done">
        <div class="row justify-content-center">
          <div class="col">
            <div class="row">
              <div class="col masuk">Masuk</div>
              <div class="col register-click" onclick="showRegister()">
                Register
              </div>
            </div>
            <form onsubmit="login(event)">
              <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" class="form-control" />
              </div>
              <div class="form-group">
                <label for="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  class="form-control"
                />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name : 'Login'
}
</script>

<style>

</style>
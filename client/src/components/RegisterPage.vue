<template>
  <section id="register-page">
        <div id="card">
          <div id="card-content">
            <div id="card-title">
              <h5>Register your account here!</h5>
            </div>
            <form method="post" class="form">
                <label for="user-email" style="padding-top:13px">
                    &nbsp;Full-name
                  </label>
                <input id="user-email" class="form-content" type="email" name="email" autocomplete="email" required />
                <div class="form-border"></div>  
              <label for="user-email" style="padding-top:13px">
                  &nbsp;Email
                </label>
              <input id="user-email" class="form-content" type="email" name="email" autocomplete="current-password" required />
              <div class="form-border"></div>
              <label for="user-password" style="padding-top:22px">&nbsp;Password
                </label>
              <input id="user-password" class="form-content" type="password" name="password" required />
              <div class="form-border"></div>
              <input id="submit-btn" type="submit" name="submit" value="REGISTER" />
            </form>
          </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'RegisterPage'
}
</script>

<style>

</style>
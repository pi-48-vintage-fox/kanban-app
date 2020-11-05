<template>
  <div class="login">
    <h1>Login</h1>
    <form method="post">
      <input type="text" name="u" placeholder="Username" required="required" />
      <input
        type="password"
        name="p"
        placeholder="Password"
        required="required"
      />
      <button type="submit" class="btn btn-primary btn-block btn-large">
        Let me in.
      </button>
    </form>

    <!-- OAUTH -->
    <div class="input-group">
      <h6 class="mt-2 text-white">or sign up using</h6>
      &nbsp;
      <div
        class="flex-c-m m-r-5 g-signin2"
        data-longtitle="true"
        data-onsuccess="onSignIn"
      ></div>
    </div>
    <!-- OAUTH -->
  </div>
</template>

<script>
export default {
  name:'login'
};
</script>
  
<style>
  .body{
  background: #092756;
	background: -moz-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%),-moz-linear-gradient(top,  rgba(57,173,219,.25) 0%, rgba(42,60,87,.4) 100%), -moz-linear-gradient(-45deg,  #670d10 0%, #092756 100%);
	background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -webkit-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -webkit-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -o-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -o-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -o-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -ms-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), -ms-linear-gradient(top,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), -ms-linear-gradient(-45deg,  #670d10 0%,#092756 100%);
	background: -webkit-radial-gradient(0% 100%, ellipse cover, rgba(104,128,138,.4) 10%,rgba(138,114,76,0) 40%), linear-gradient(to bottom,  rgba(57,173,219,.25) 0%,rgba(42,60,87,.4) 100%), linear-gradient(135deg,  #670d10 0%,#092756 100%);
  }
</style>
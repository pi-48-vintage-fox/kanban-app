<template>
  <nav
    class="navbar navbar-expand-sm navbar-dark d-flex justify-content-between align-items-center"
  >
    <div>
      <img
        src="https://images.unsplash.com/profile-1503441064920-b2ae3a69768e?auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff"
        class="d-inline-block align-top rounded-circle profpic"
        alt=""
      />
      <a class="navbar-brand ml-2 user" data-abc="true" style="color: lightcyan"
        >User Name</a
      >
    </div>
    <div></div>
    <div>
      <a
        href=""
        type="button"
        class="btn btn-primary btn-large justify-content-end"
        style="color: marron"
      >
        Log Out</a
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "userInfo",
};
</script>

<style>
</style>
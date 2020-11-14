<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <button @click="question" class="btn px-4" v-show="access_token">
              <svg
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                class="bi bi-question-circle text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"
                />
              </svg>
            </button>
          </ul>

          <ul>
            <li class="nav-item dropdown text-decoration-none nav-dropdown list-unstyled" v-show="access_token">
              <h4
                class="font-font-weight-bold text-white dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-show="access_token"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-people-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                  />
                </svg>
                Hello {{ name }}, welcome!
                <span class="sr-only">(current)</span>
              </h4>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item my-2" href="#">Profile (comming soon)</a>
                <div class="dropdown-divider"></div>
                <button
                  class="btn-md my-2 my-sm-0 ml-4 px-2 btn-danger rounded"
                  id="btn-logout-nav"
                  type="submit"
                  v-on:click="logoutMethod"
                  v-show="access_token"
                >
                  Logout
                </button>
                <div class="dropdown-divider"></div>
              </div>
            </li>
          </ul>

          <button
            class="btn btn-outline-primary my-2 my-sm-0 mr-4"
            id="btn-register-nav"
            type="submit"
            v-on:click="changePage('register-page')"
            v-show="!access_token"
          >
            Register
          </button>
          <button
            class="btn btn-primary my-2 my-sm-0"
            id="btn-login-nav"
            type="submit"
            v-on:click="changePage('login-page')"
            v-show="!access_token"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    changePage(pageName) {
      this.$emit("changePage", pageName);
    },
    logoutMethod() {
      this.$emit("logoutMethod");
    },
    question() {
      Swal.fire(
        "How this work? You can drag and update your progress. \n And you can add a new Category & task"
      );
    },
  },
  props: ["access_token", "name"],
};
</script>

<style>

</style>

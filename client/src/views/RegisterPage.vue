<template>
  <div class="center-content border-radius-task">
    <div v-if="message">
      <ul class="bg-red-600 text-white">
        <div v-html="message"></div>
      </ul>
    </div>
    <div>
      <form
        class="shadow-md rounded px-8 pt-6 pb-8 mb-4 regBox"
        v-on:submit.prevent="registerNewUser"
      >
        <div class="text-2xl mb-8 font-bold text-blue-700">Register</div>
        <div class="mb-4">
          <label
            class="block text-blue-700 text-sm font-bold mb-2"
            for="userNameRegister"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            v-model="userNameRegister"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div class="mb-4">
          <label class="block text-blue-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
            id="usernameReg"
            v-model="emailRegister"
            type="email"
            placeholder="johndoe@mail.com"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-blue-700 text-sm font-bold mb-2"
            for="passwordRegister"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-blue-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            v-model="passwordRegister"
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <br />
        <a
          @click.prevent="changePage('loginPage')"
          id="redirect"
          class="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
          >Already have an account? Click here.</a
        >
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "RegisterPage",
  data() {
    return {
      userNameRegister: "",
      emailRegister: "",
      passwordRegister: "",
      message: ""
    };
  },
  props: ["baseUrl"],
  methods: {
    registerNewUser() {
      axios({
        method: "POST",
        url: this.baseUrl + "/register",
        data: {
          name: this.userNameRegister,
          email: this.emailRegister,
          password: this.passwordRegister,
        },
      })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          swal("Success", "Register Success!", "success");
          this.changePage("loginPage");
        })
        .catch((err) => {
          // let msg = [];
          // if (Array.isArray(err.response.data.message)) {
          //   err.response.data.message.forEach((el) => {
          //     msg.push(`<li>${el}</li>`);
          //   });
          //   this.message = msg.join(" ");
          // } else {
          //   this.message = err.response.data.message;
          // }
          console.log(err);
        });
    },
    changePage(page) {
      this.$emit("changePage", page);
    }
  }
};
</script>

<style scoped>
img {
  height: 50px;
}
img:hover {
  box-shadow: 0px -2px 14px -1px rgba(255, 255, 255, 1);
}
.regBox {
  margin-bottom: -30px;
  box-shadow: -1px 3px 15px 0px rgba(0, 0, 0, 1);
  border-radius: 25px;
  width: 500px;
  align-items: center;
  align-self: center;
  text-align: center;
}
#redirect:hover {
  cursor: pointer;
}
</style>
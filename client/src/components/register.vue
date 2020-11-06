<template>
  <div>
      <div class="container">
          <h1 class=" row justify-content-center mt-5">Register</h1>
          <div class="row justify-content-center mt-5">
              <img src="" alt="" srcset="">
            <form @submit.prevent="register">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="data.email"  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="data.password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "../../config/axios"
export default {
    name: "register",
    data() {
        return {
            data: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        register() {
            axios({
                url: '/register',
                method: 'POST',
                data: {
                    email: this.data.email,
                    password: this.data.password
                }
            })
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Register successfuly',
                    showConfirmButton: false,
                    timer: 1500
                    })
                localStorage.setItem('access_token', response.data.access_token)
                this.$emit('afterRegister')
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data
                    })
            })
        }
    }
}
</script>

<style>

</style>
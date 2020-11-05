<template>
    <section class="register-page mt-5" id="register-page">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body text-center">
                            <h3 class="card-text">SIGN UP</h3>
                            <form @submit.prevent="register" class="">
                                <div class="form-group mt-5">
                                    <input v-model="userRegister.firstName" type="text" class="form-control mx-auto" id="first_name" placeholder="first name">
                                </div>
                                <div class="form-group mt-5">
                                    <input v-model="userRegister.lastName" type="text" class="form-control mx-auto" id="last_name" placeholder="last name">
                                </div>
                                <div class="form-group mt-5">
                                    <input v-model="userRegister.email" type="email" class="form-control mx-auto" id="register-email" aria-describedby="emailHelp" placeholder="email address">
                                </div>
                                <div class="form-group mt-5">
                                    <input v-model="userRegister.password" type="password" class="form-control mx-auto" id="register-password" placeholder="password">
                                </div>
                                <button type="submit" class="mt-5 btn btn-login">SIGN UP</button>
                            </form>
                            <button class="btn mt-5" href="" @click="changePage('login-page')">SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            userRegister: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
        }
    },
    methods: {
      register(){
            axios({
                method: 'POST',
                url: this.server + '/register',
                data: this.userRegister
            })
            .then(res => {
                console.log(res);
                this.page = 'login-page'
            })
            .catch(err => {
                swal(err.response.data.message);
            })
        }  
    }
}
</script>

<style>

</style>
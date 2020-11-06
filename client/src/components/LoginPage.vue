<template>
    <section class="login-page mt-5" id="login-page">
            <div class="row mx-auto">
                <div class="col-12">
                    <div class="card" id="card-login-page">
                        <div class="card-body text-center">
                            <h3 class="card-text">SIGN IN</h3>
                            <form @submit.prevent="login" class="">
                                <div class="form-group mt-5">
                                    <input v-model="userLogin.email"  type="email" class="form-control mx-auto" id="email" aria-describedby="emailHelp" placeholder="email address">
                                </div>
                                <div class="form-group mt-5">
                                    <input v-model="userLogin.password" type="password" class="form-control mx-auto" id="password" placeholder="password">
                                </div>
                                <button  type="submit" class="mt-5 btn btn-login">SIGN IN</button>
                            </form>
                            <button class="btn mt-5" href="" v-on:click="registerPage()">SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
export default {
    name: 'LoginPage',
    props: ['userLogin'],
    methods: {
        login(){
            this.$emit('login');
        },
        registerPage(){
            this.$emit('changePage', 'register-page');
        },
        homePage(){
            this.$emit('changePage', 'home-page');
        },
        fetchTasks(){
            this.$emit('fetchTasks');
        }
    }
}
</script>

<style>

</style>
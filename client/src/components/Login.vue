<template>
    <section class="container formbox containermodif" id="login">
        <div class="row justify-content-center mt-5">
        <div class="col-4">
            <h1>Login</h1><br>
            <form action="" @submit.prevent='loginSubmit'>
            <div class="form-group"> 
                <label for="login-email">Email</label>
                <input class="form-control" type="email" v-model="email">
                <small id="emailHelp" class="form-text text-muted text-orange">We'll never share your email with
                anyone
                else.</small>
            </div>
            <div class="form-group">
                <label for="login-password">Password</label>
                <input class="form-control" type="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-success">Login</button>
            <p class="">Don't have account? <a href="#" id="a-register" @click="showRegister">Register here</a></p>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </form>
        </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['propslogin'],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods : {
        loginSubmit(){
            this.propslogin({email: this.email, password: this.password})

            this.$emit("change-page",'home-page')
        },
        showRegister(){
            this.$emit("change-page",'register-page')
        }
    }
    
}
</script>

<style>

</style>
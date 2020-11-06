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
            </form>
            <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
        </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['propslogin','propsgoogle'],
    data() {
        return {
            email: '',
            password: '',
            clientId: '666040877350-56mid0g22iokhigjb8gk3ak32cesho5f.apps.googleusercontent.com'
        }
    },
    methods : {
        loginSubmit(){
            this.propslogin({email: this.email, password: this.password})

            this.$emit("change-page",'home-page')
        },
        showRegister(){
            this.$emit("change-page",'register-page')
        },
        OnGoogleAuthSuccess (idToken) {
        console.log(idToken)
            this.propsgoogle({id: idToken})

        // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
        console.log(error)
        }
    }
    
}
</script>

<style>
    .google-signin-button {
    color: white;
    background-color: red;
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px 20px 25px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>
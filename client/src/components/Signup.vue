<template>
    <section class="container formbox containermodif" id="signup">
        
        <div class="row justify-content-center mt-5">
            
        <div class="col-4">
            <h1>Sign Up</h1><br>
            <form action="" @submit.prevent="registerSubmit">
            <div class="form-group">
                <label for="signup-email">Email</label>
                <input class="form-control" type="email" v-model="email">
                <small id="emailHelp" class="form-text text-muted text-orange">We'll never share your email with
                anyone
                else.</small>
            </div>
            <div class="form-group">
                <label for="signup-password">Password</label>
                <input class="form-control" type="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <p class="">Already have account? <a href="#" id="a-signup" @click="showLogin" >Login here</a></p>
            </form>
        </div>
        </div>
    </section>   
</template>

<script>
export default {
    props: ['propsregister'],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        registerSubmit(){
            this.propsregister({email: this.email, password: this.password})
            this.$emit("change-page",'login-page')
        },
        showLogin(){
            this.$emit("change-page",'login-page')
        }
    }
}
</script>

<style>

</style>
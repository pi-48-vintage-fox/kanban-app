<template>
    <div class="container justify-content-center" id="landing-page">
        <section> 
            <div id="login-box" class="justify-content-center"> 
                <div class="container justify-content-center mt-5">
                    <form @submit.prevent="loginUser">
                        <h3 class="text-dark text-center">Kanban Login</h3>
                        <div class="form-group">
                            <label for="email_login" class="text-dark">Email</label>
                            <input type="email" class="form-control" id="email_login" aria-describedby="emailHelp" autocomplete="email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password_login" class="text-dark">Password</label>
                            <input type="password" class="form-control" id="password_login" autocomplete="current-password" v-model="password">
                        </div>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        <button type="submit" class="btn btn-primary" style="background-color: #F6F5F0; color: black; width: 600px">Submit</button>
                    </form>
                    <br>
                    <small @click.prevent="switchToRegister">Create an account</small>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data (){
        return {
            email: '',
            password: ''
        }
    },
    methods : {
        switchToRegister () {
            this.$emit('changePage', 'RegisterPage')
        },
        loginUser (){
             let payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('loginUser', payload)
        }
    }

}
</script>

<style>

</style>
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
                    <small class="form-text text-muted" style="line-height: 30px;" @click.prevent="googleLogin">Sign in with your google account</small>
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                    <small @click.prevent="switchToRegister" style="text-align: right">Create an account</small>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
    name: 'LoginPage',
    data (){
        return {
            email: '',
            password: '',
            params: {
                client_id: "365819165459-244erimjnuagnlvtirgm2t6isncdinpq.apps.googleusercontent.com"
            },
            renderParams: {
                width: 600,
                height: 50,
                longtitle: true
            }
        }
    },
    components: {
        GoogleLogin
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
        },
        onSuccess(googleUser) {
            console.log(googleUser);
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
            var google_access_token = googleUser.getAuthResponse().id_token;
            this.$emit('GoogleLogin', google_access_token)
        },
        onFailure(err){
            console.log(err)
        }
    }

}
</script>

<style>

</style>
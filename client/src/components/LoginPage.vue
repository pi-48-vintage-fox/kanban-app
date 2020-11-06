<template>
    <div>
        <link rel="stylesheet" href="https://unpkg.com/98.css">
        <div id="loginpage" class="homefacelogin">
        <div class="backgroundlogin"></div>
        <img class="wallpaperdolphin" src="./public/image/770908-dolphin-wallpaper-1920x1080-tablet.jpg" style="width: 1000px;">
        <div id="windowcard" class="window" style="margin: 10px;">
            <div class="title-bar">
                <div class="title-bar-text">Login</div>
            </div>
            <div id="card-body2" class="window-body">
                <form @submit.prevent="login">
                    <input v-model="emailInput" class="form-control form-control-sm" type="text" placeholder="Type your email..">
                    <input v-model="passwordInput" class="form-control form-control-sm" type="password" placeholder="Type your password..">
                    <button id="submitlogin" type="submit">Login</button>
                </form>
                <div style="margin-left: 30px;">
                    <button v-on:click.prevent="showRegister()">Create New Account</button>
                    <div class="text-right" style="text-align: right;">
                        <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 0px;">or Login using..</p>
                        <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Google Login</GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
        <img src="./public/image/BE.jpg" style="margin: 10px; z-index: 2;">
        
        <!-- Register=================================== -->
        <div v-show="!changer" id="register" class="window" style="width: 300px;">
            <div class="title-bar">
                <div class="title-bar-text">Create New Account</div>
                <div class="title-bar-controls">
                    <button v-on:click.prevent="unshowRegister()" aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body" style="padding: 10px;">
                <form @submit.prevent="register">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Name :</p>
                    <input v-model="nameRegis" class="form-control form-control-sm" type="text" style="margin-bottom: 10px;" placeholder="Type your name..">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Email :</p>
                    <input v-model="emailRegis" class="form-control form-control-sm" type="text" style="margin-bottom: 10px;" placeholder="Type your email..">
                    <p class="text-login" style="font-size: 12px; color: rgb(59, 58, 58); margin-bottom: 5px;">Password :</p>
                    <input v-model="passwordRegis" class="form-control form-control-sm" type="password" style="margin-bottom: 10px;" placeholder="Type your password..">
                    <button id="submitlogin" type="submit" style="margin-bottom: 20px;">Register</button>
                </form>
            </div>
        </div>
    
        
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name: 'LoginPage',
    data() {
        return {
            changer: true,
            emailInput: '',
            passwordInput: '',
            nameRegis: '',
            emailRegis: '',
            passwordRegis: '',
            params: {
                    client_id: "482363522772-40b3pq35rms4l3f5i4n17v6pla8kvkjo.apps.googleusercontent.com"
            },
            renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        showRegister() {
            this.changer = false
        },
        unshowRegister() {
            this.changer = true
        },
        login() {
            let payload = {
                email: this.emailInput,
                password: this.passwordInput
            }
            this.$emit('login', payload)
        },
        register() {
            let payload = {
                name: this.nameRegis,
                email: this.emailRegis,
                password: this.passwordRegis
            }
            this.unshowRegister()
            this.$emit('register', payload)
        },
        onSuccess(googleUser) {
            // console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile().getName());
            var google_access_token = googleUser.getAuthResponse().id_token;
            // console.log(google_access_token);
            const payload = {
                name: googleUser.getBasicProfile().getName(),
                google_access_token
            }
            this.$emit('GoogleLogin', payload)
        },
        onFailure(error) {
            console.log(error);
        }
    }
}
</script>

<style>

</style>
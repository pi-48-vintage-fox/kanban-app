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
                             <button v-google-signin-button="clientId" class="google-signin-button btn mt-5"> Login with Google</button>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
export default {
    name: 'LoginPage',
    props: ['userLogin', 'clientId'],
    methods: {
        login(){
            this.$emit('login');
        },
        OnGoogleAuthSuccess (idToken) {
            var base64Url = idToken.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            axios({
                method: 'POST',
                url: 'https://kanban-web-app.herokuapp.com/google-login',
                data: {
                    email: payload.email
                }
            })
            .then(resp => {
                console.log(resp);
                const access_token = resp.data.access_token;
                this.page = 'home-page';
                localStorage.setItem('access_token', access_token);
                location.reload();
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err);
            })
        },
        OnGoogleAuthFail (error) {
            console.log(error)
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
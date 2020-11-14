<template>
    <section class="login mt-5">
        <div class="container h-100">
            <div class="row h-100">
                <div class="col-7 mr-5">
                    <img src="../assets/images/login-authen.svg" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                </div>
                <div class="col-4">
                    <div class="card p-3 shadow animate__animated animate__backInDown animate__slower">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Login</h4>
                            <form action="" method="post" id="form-login" v-on:submit.prevent="loginMethod">
                                <div class="form-group">
                                <label for="email-login">Email: </label>
                                <input type="text" class="form-control" name="email-login" id="email-login" aria-describedby="helpId" placeholder="" v-model="login.email">
                                <small id="helpId" class="form-text text-muted">Ex: jhon@mail.com</small>
                                </div>
                                <div class="form-group">
                                <label for="password-login">Password: </label>
                                <input type="password" class="form-control" name="password-login" id="password-login" aria-describedby="helpId" placeholder="" v-model="login.password">
                                <small id="helpId" class="form-text text-muted">Insert your password</small>
                                </div>
                                <button type="submit" class="btn btn-primary shadow">Login</button>
                                <br> <br>
                                <span id="error-msg-login" class="text-danger error-msg">{{errorMsg}}</span>
                            </form>
                              <button v-google-signin-button="clientId" class="google-signin-button"> Sign In Google
                              </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            login: {
                email: "",
                password: ""
            },
            clientId: '172830930043-gappl6eb5hr73j17vckmvrqi4mm1uuru.apps.googleusercontent.com'
        }
    },
    methods: {
        loginMethod(){
            const data = {
                email: this.login.email,
                password: this.login.password
            }
            this.$emit("loginMethod", data)
            this.login.email = ""
            this.login.password = ""
        },
        OnGoogleAuthSuccess(idToken){
            // console.log(idToken)
            this.$emit("OnGoogleAuthSuccess", idToken)
            
        },
        OnGoogleAuthFail(error) {
            // console.log(error)
            this.$emit("OnGoogleAuthFail", error)
            // this.$emit("OnGoogleAuthFail", error)
        }
    },
    props: ["errorMsg"]
}
</script>

<style>
    .google-signin-button {
    color: white;
    background-color: rgb(8, 80, 139);
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
    padding: 10px 20px 25px 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>
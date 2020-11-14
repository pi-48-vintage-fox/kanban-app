<template>
    <section class="register mt-5">
        <div class="container h-100">
            <div class="row h-100">
                <div class="col-7 mr-5 mt-5">
                    <img src="../assets/images/undraw_add_post_64nu.svg" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                </div>
                <div class="col-4">
                    <div class="card p-3 shadow animate__animated animate__backInDown animate__slower">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Register</h4>
                            <form action="" id="form-register" v-on:submit.prevent="registerMethod">
                                <div class="form-group">
                                    <label for="name-register">name: </label>
                                    <input type="text" class="form-control" name="name" id="name-register" aria-describedby="helpId" placeholder="" v-model="register.name">
                                    <small id="helpId" class="form-text text-muted">Insert your name</small>
                                </div>
                                <div class="form-group">
                                    <label for="email-register">Email: </label>
                                    <input type="email" class="form-control" name="email" id="email-register" aria-describedby="helpId" placeholder="" v-model="register.email">
                                    <small id="helpId" class="form-text text-muted">Ex: jhon@mail.com</small>
                                </div>
                                <div class="form-group">
                                    <label for="password-register">Password: </label>
                                    <input type="password" class="form-control" name="password" id="password-register" aria-describedby="helpId" placeholder="" v-model="register.password">
                                    <small id="helpId" class="form-text text-muted">Insert your password</small>
                                </div>
                                <button type="submit" class="btn btn-primary shadow">Register</button>
                                <br> <br>
                                <span id="error-msg-register" class="text-danger">{{errorMsg}}</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Register",
    data(){
        return{
            register: {
                name: "",
                email: "",
                password: "",
            },
        }
    },
    methods: {
        registerMethod(){
            const data = {
                name: this.register.name, 
                email: this.register.email, 
                password: this.register.password
            }
            this.$emit("registerMethod", data)
            this.register.name = ""
            this.register.email = ""
            this.register.password = ""
        }
    },
    props: ["errorMsg"]
}   
</script>

<style>

</style>
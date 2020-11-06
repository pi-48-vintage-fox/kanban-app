<template>
  <div class="container justify-content-center" id="landing-page">
        <section> 
            <div id="register-box" class="justify-content-center"> 
                <div class="container justify-content-center">
                    <form @submit.prevent="createAccount">
                        <h3 class="text-dark text-center">Kam-ban Register</h3>
                        <div class="form-group">
                            <label for="name_register" class="text-dark">Name</label>
                            <input type="text" class="form-control" id="name_register" autocomplete="name" v-model="name">
                        </div>
                        <div class="form-group">
                            <label for="email_register" class="text-dark">Email</label>
                            <input type="email" class="form-control" id="email_register" aria-describedby="emailHelp" autocomplete="email" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password_register" class="text-dark">Password</label>
                            <input type="password" class="form-control" id="password_register" autocomplete="current-password" v-model="password">
                        </div>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        <button type="submit" class="btn btn-primary" style="background-color: #F6F5F0; color: black; width: 100%;">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        
        createAccount(){
            let payload = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.$emit('createAccount', payload)
        }
    }
}
</script>

<style>

</style>
<template>
    <div>

            <login v-if="pageName == 'login'"
            @login="login"
            @registerForm="registerForm"
            >
            </login>
            <register v-else-if="pageName == 'register'"
            @afterRegister="afterRegister"
            >
            </register>
            <home v-else-if="pageName == 'home' "
            @logout='logout'
            @add='add'
            >
            </home>
            <add v-else-if="pageName == 'add'"
            @add='afterAdd'
            ></add>
    </div>
</template>

<script>
import add from "./components/add"
import login from "./components/login"
import home from "./components/home"
import register from "./components/register"
import axios from "../config/axios"
export default {
    name: "App",
    data() {
        return {
            pageName: 'login',
        }
    },
    components: {
        login, home, register, add
    },
    methods: {
        login() {
            this.pageName = "home"
        },
        registerForm() {
            this.pageName = 'register'
        },
        afterRegister() {
            this.pageName = 'home'
        },
        logout() {
            localStorage.clear()
            this.pageName = "login"
        },
        add() {
            this.pageName = 'add'
        },
        afterAdd() {
            this.pageName = 'home'
        }
    },
    created() {
        if(!localStorage.access_token) {
            this.pageName = 'login'
        } else {
            this.pageName = 'home'
        }
    }
   
}
</script>

<style>

</style>
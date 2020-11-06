<template>
    <div>

            <login v-if="pageName == 'login'"
            @login="login"
            @registerForm="registerForm"
            ></login>

            <register v-else-if="pageName == 'register'"
            @afterRegister="afterRegister"
            ></register>

            <home v-else-if="pageName == 'home' "
            @logout='logout'
            @add='add'
            @updateData="updateData"
            ></home>

            <add v-else-if="pageName == 'add'"
            @add='afterAdd'
            ></add>

            <updateData v-else-if="pageName == 'updateData'"
            :detailTask="detailTask"
            @afterUpdate="afterUpdate"
            ></updateData>
    </div>
</template>

<script>
import updateData from "./components/updateData"
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
            detailTask: null,

        }
    },
    components: {
        login, home, register, add, updateData
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
            Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logout successfuly',
                    showConfirmButton: false,
                    timer: 1500
                    })
            localStorage.clear()
            this.pageName = "login"
        },
        add() {
            this.pageName = 'add'
        },
        afterAdd() {
            this.pageName = 'home'
        },
        updateData(payload) {
            this.pageName = 'updateData'
           this.detailTask = payload
        },
        afterUpdate() {
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
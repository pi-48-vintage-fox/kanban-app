<template>
    <div>
        <Login v-if="pageName == 'login-page'" @login="login" @changePage="changePage"></Login>

        <Register v-else-if="pageName == 'register-page'" @register="register"></Register>

        <AddPage v-else-if="pageName == 'add-page'" @add="add"></AddPage>

        <HomePage v-else-if="pageName == 'home-page'" :tasks = "tasks" @changePage="changePage"></HomePage>

    </div>
</template>

<script>
import Login from './components/Login'
import Register from './components/Register'
import AddPage from './components/AddPage'
import HomePage from './components/HomePage'
import axios from './config/axios'
export default {
    name: 'App',
    data(){
        return{
            pageName: "login-page",
            tasks: []
        }
    },
    components: {
        Login,
        Register,
        AddPage,
        HomePage
    },
    methods:{
     changePage(payload) {
        console.log(payload)
        this.pageName = payload;
    },
    fetchTasks(){
        const access_token = localStorage.getItem('access_token')
        axios({
            url : '/task',
            method : 'GET',
            headers: {
                access_token : access_token
            }
        })
        .then((result) =>{
        console.log(result)
        this.tasks = result.data
        })
        .catch(err=>{
        console.log(err);
        })
    },
    add(payload){
        const access_token = localStorage.getItem('access_token')
        axios({
            url : '/task',
            method : 'POST',
            headers: {
                access_token : access_token
            },
            data: {
                title: payload.title,
            },
        })
        .then(result=>{
        console.log(result)
        this.fetchTasks()
        this.pageName = "home-page"
        })
        .catch(err=>{
        console.log(err);
        })
    },
    login(payload){
            axios({
            url : '/user/login',
            method: 'POST',
            data : {
                email: payload.email,
                password: payload.password
            }
        })
        .then(result =>{
            console.log('success login')
            console.log(result.data)
            localStorage.setItem('access_token', result.data.access_token)
            this.pageName = "home-page"
            this.fetchTasks()
        })
        .catch(err =>{
            console.log('login unsuccess')
            console.log(err)
        })
    },
    register(payload){
        axios({
            url: '/user/register',
            method: 'POST',
            data: {
                email: payload.email,
                password: payload.password
            },
        })
        .then(result =>{
            console.log(result)
            this.pageName = "login-page"
        })
        .catch(err =>{
            console.log(err)
        })
    }
    },
    created(){
        if(localStorage.getItem('access_token')){
            this.pageName = "home-page"
            this.fetchTasks()
        }else{
            this.pageName = "login-page"
        }
    }
}
</script>

<style>

</style>
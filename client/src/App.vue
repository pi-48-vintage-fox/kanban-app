<template>
    <section>
        <navbar v-if="pageName == 'home-page'" @logout="logout" @change-page="changePage"></navbar>
        <homepage v-if="pageName == 'home-page'" :categories="categories" :tasks="tasks" @showEdit="showEdit"
        @deleteTask="deleteTask" @patchTask="patchTask">
        </homepage>
        <login v-if="pageName == 'login-page'" :propslogin="login" :propsgoogle="google" @change-page="changePage"></login>
        <signUp v-if="pageName == 'register-page'" :propsregister="register" @change-page="changePage"></signUp>
        <addForm v-if="pageName == 'add-page'" :propsadd="addTask" @change-page="changePage"></addForm>
        <editForm v-if="pageName =='edit-form'"></editForm>
        <bawahan v-if="pageName == 'home-page'"></bawahan>
    </section>
</template>

<script>
import navbar from './components/Navbar'
import bawahan from './components/Footer'
import homepage from './components/HomePage'
import login from './components/Login'
import signUp from './components/Signup'
import addForm from './components/AddForm'
import axios from './config/axios'
export default {
    name:'App',
    components: {navbar, bawahan, homepage, login, signUp, addForm},

    data() {
            return {
                pageName: 'home-page',
                message: 'Hello world',
                showAdd: false,
                showEdit: false,
                showRegister: false,
                categories: [
                    {"category": 'backlog',
                    "title": 'Backlog'},
                    {"category": 'production',
                    "title": 'Production'},
                    {"category": 'inprogress',
                    "title": 'In Progress'},
                    {"category": 'done',
                    "title": 'Done'},
                ],
                tasks: [],
                detailTask: null
                    
            };
    },
    methods: {
        changePage(name){
            console.log(name);
            this.pageName = name
        },
        login (payload) {
            axios({
                method: 'post',
                url: '/login',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(function (response) {
                console.log(response);  
                localStorage.setItem('access_token',response.data.access_token)
            })
            .catch(err=>{
                console.log(err);
            })
        },
        logout(){
            localStorage.clear()
            this.changePage('login-page')
        },
        register (payload) {
            axios({
                method: 'post',
                url: '/register',
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(response=>{
                console.log(response);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        addTask(payload){
            axios({
                method: 'post',
                url: '/tasks',
                data: {
                    title: payload.title,
                    description: payload.description
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response=>{
                console.log(response);
                this.fetchTasks()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        showEdit(payload){
            console.log(payload);
            this.pageName = 'edit-form'
            this.detailTask = payload.task
        },
        editTask(payload){
            axios({
                method: 'put',
                url: `/tasks/${payload.id}`,
                data: {
                    title: payload.title,
                    description: payload.description,
                    category: payload.category
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response=>{
                console.log(response);
                this.fetchTasks()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        patchTask(payload){
            axios({
                method: 'patch',
                url: `/tasks/${payload.id}`,
                data: {
                    category: payload.category
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response=>{
                console.log(response);
                this.fetchTasks()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        deleteTask(payload){
            console.log(payload);
            axios({
                method: 'delete',
                url: `/tasks/${payload.id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response=>{
                console.log(response);
                this.fetchTasks()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        fetchTasks (){
            axios({
                method: 'get',
                url: '/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(response=>{
                console.log('tanda');
                console.log(response.data);
                this.tasks = response.data
            })
            .catch(err=>{
                console.log(err);
            })
        },
        google(payload) {
            console.log(payload);
            const google_token = payload.id;
            axios({
            method: "post",
            url: "/googleLogin",
            data: {
                google_token,
                },
            })
            .then((response) => {
                    localStorage.setItem('access_token',response.data.access_token)
                    this.changePage('home-page')
                    this.fetchTasks()
                })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    created() {
        if(!localStorage.getItem('access_token')){
            this.pageName = 'login-page'
        }else{          
            this.fetchTasks()
            this.pageName = 'home-page'   
        }
    }

}
</script>

<style scoped>
</style>


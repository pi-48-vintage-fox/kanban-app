<template>
    <div>
        <Login v-if="pageName == 'login-page'" @login="login" @changePage="changePage"></Login>

        <Register v-else-if="pageName == 'register-page'" @register="register"></Register>

        <AddPage v-else-if="pageName == 'add-page'" @add="add"></AddPage>

        <EditCategory v-else-if="pageName == 'edit-category'" 
        @editCategory="editCategory" 
        :taskId="taskId">
        </EditCategory>

        <HomePage v-else-if="pageName == 'home-page'" 
        :tasks = "tasks" 
        :categories = "categories" 
        @changePage="changePage"
        @deleteTask="deleteTask"
        @toCategory="toCategory"
        @editCategory="editCategory"
        @editTask="editTask"
        ></HomePage>

    </div>
</template>

<script>
import Login from './components/Login'
import Register from './components/Register'
import AddPage from './components/AddPage'
import HomePage from './components/HomePage'
import EditCategory from './components/EditCategory'
import axios from './config/axios'
export default {
    name: 'App',
    data(){
        return{
            pageName: "login-page",
            tasks: [],
            categories : [],
            id:0
        }
    },
    components: {
        Login,
        Register,
        AddPage,
        HomePage,
        EditCategory
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
        this.tasks = result.data
        })
        .catch(err=>{
        console.log(err);
        })
    },
    fetchCategory(){
        const access_token = localStorage.getItem('access_token')
        axios({
            url : '/category',
            method : 'GET',
            headers: {
                access_token : access_token
            }
        })
        .then((result) =>{
        console.log(result.data)
        this.categories = result.data
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
        this.fetchTasks()
        this.fetchCategory()
        this.pageName = "home-page"
        })
        .catch(err=>{
        console.log(err);
        })
    },
    editTask(payload){
        console.log(payload)
        const access_token = localStorage.getItem('access_token')
        axios({
            url : '/task/'+payload.id,
            method : 'PUT',
            headers: {
                access_token : access_token
            },
            data: {
                title: payload.title,
            },
        })
        .then(result=>{
        this.fetchTasks()
        this.fetchCategory()
        this.pageName = "home-page"
        })
        .catch(err=>{
        console.log(err);
        })
    },
    deleteTask(id){
    const access_token = localStorage.getItem('access_token')
            axios({
            url : '/task/ ' + id,
            method: 'DELETE',
            headers: {
                access_token : access_token
            },
        })
        .then(result =>{
            console.log('success delete')
            this.pageName = "home-page"
            this.fetchTasks()
            this.fetchCategory()
        })
        .catch(err =>{
            console.log('delete unsuccess')
            console.log(err)
        })
    },
    toCategory(obj){
        this.pageName = 'edit-category'
        this.taskId=obj.id
    },
    editCategory(obj){
        const access_token = localStorage.getItem('access_token')
            axios({
            url : '/category/'+obj.id,
            method: 'PATCH',
            headers: {
                access_token : access_token
            },
            data:{
                CategoryId: obj.category
            }
        })
        .then((result) =>{
            this.pageName = "home-page"
            this.fetchTasks()
            this.fetchCategory()
        })
        .catch(err =>{
            console.log(err)
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
            this.fetchCategory()
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
            this.fetchCategory()
        }else{
            this.pageName = "login-page"
        }
    }
}
</script>

<style>

</style>
<template>
  <div class="h-100">
      <Navbar
        @changePage="changePage"
        @logoutMethod="logoutMethod"
        :access_token="access_token"
        :name="name"
      ></Navbar>

      <Login 
        v-if="pageName == 'login-page'"
        @loginMethod="loginMethod"
        :errorMsg="errorMsg"
        @OnGoogleAuthSuccess="OnGoogleAuthSuccess"
        @OnGoogleAuthFail="OnGoogleAuthFail"
        @changePage="changePage"
        class="animate__animated animate__zoomInDown"
      ></Login>

      <Register 
        v-else-if="pageName == 'register-page'"
        @registerMethod="registerMethod"
        :errorMsg="errorMsg"
        class="animate__animated animate__zoomInDown"
      ></Register>

      <Content
        v-else-if="pageName == 'content-page'"
        :categories="categories"
        :tasks="tasks"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @editTask="editTask"
        @updateCatTask="updateCatTask"
        @updateCategoryDrag="updateCategoryDrag"
        @addCategory="addCategory"
        @deleteCategory="deleteCategory"
        :conjunctions="conjunctions"
      ></Content>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import Content from "./components/Content"
import axios from "./config/axios"
import Swal from 'sweetalert2'
import {successLogin, successLogout, successCRUD} from "./helpers/swal"

export default {
    name: "App",
    data(){
        return {
            pageName: "",
            errorMsg: "",
            access_token: null || localStorage.access_token,
            name: null || localStorage.name,
            tasks: [],
            categories: [],
            conjunctions: []
        }
    },
    methods: {
        changePage(page){
            this.pageName = page
            this.errorMsg = ""
        },
        registerMethod(data){
            fetch("http://localhost:3000/register",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // this needs to be defined
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json()
            })
            .then(res => {
                if(res.message) {
                this.errorMsg = res.message
                } else {
                this.pageName = "login-page"
                Swal.fire(
                    'Success create a new member!',
                    'Lets login!',
                    'success'
                )
                }
            })
            .catch(err => console.log(err))
        },
        loginMethod(data){
             fetch(`http://localhost:3000/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // this needs to be defined
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response.message) {
                    this.errorMsg = response.message
                } else {
                    localStorage.setItem("access_token", response.access_token)
                    localStorage.setItem("name", response.name)
                    this.changePage("content-page")
                    this.fetchTask(response.access_token)
                    this.fetchCategory(response.access_token)
                    this.fetchConjUserOrganizationTask(response.access_token)
                    this.access_token = response.access_token
                    this.name = response.name
                    // this.checkToken()
                    successLogin()
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        OnGoogleAuthSuccess(tokenGoogle){
            const access_token_google = tokenGoogle
            // console.log(tokenGoogle, "ni dr oauth google")
            axios({
                method: "POST",
                url: "/googleLogin",
                data: {
                    access_token_google
                }
            })
            .then(response => {
                // console.log(response.data)
                localStorage.setItem("access_token", response.data.access_token) 
                localStorage.setItem("name", response.data.name) 
                this.changePage("content-page")
                this.fetchTask(response.data.access_token)
                this.fetchCategory(response.data.access_token)
                this.fetchConjUserOrganizationTask(response.data.access_token)
                this.access_token = response.data.access_token
                this.name = response.data.name
            })
            .catch(err => {
                console.log(err)
            })
        },
        OnGoogleAuthFail(err){
            console.log(err)
        },
        logoutMethod(){
            Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to manage your kanban after this',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Logout!',
            cancelButtonText: 'No'
            }).then((result) => {
            if (result.value) {
                this.access_token = ""
                this.name = ""
                localStorage.clear()
                this.changePage("login-page")
                this.$emit("changePage", "login-page")
                // auth2 = gapi.auth2.getAuthInstance();
                // auth2.signOut().then(function () {
                //     console.log('User signed out.');
                // });
                successLogout()
            }
            })
        },
        checkToken(){
            if(this.access_token) {
                this.pageName = "content-page"
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()
                return true
            } else {
                this.pageName = "login-page"
                // this.fetchTask()
                // this.fetchCategory()
                return false
            }
        },
        fetchTask(token){
            axios({
                method: "GET",
                url: `/tasks`,
                headers: {
                    access_token: token || this.access_token
                }
            })
            .then(response => {
            this.tasks = response.data
            // console.log(JSON.stringify(response.data, null, 2))
            })
            .catch(err => console.log(err))
        },
        fetchCategory(token){
            axios({
                method: "GET",
                url: `/categories`,
                headers: {
                    access_token: token || this.access_token
                }
            })
            .then(response => {
                this.categories = response.data
            // console.log(JSON.stringify(response.data, null, 2))
            })
            .catch(err => console.log(err))
        },
        addTask(data){
            axios({
            method: "POST",
            url: `/tasks`,
            data: {
                title: data.title,
                description: data.description,
                CategoryId: data.CategoryId
            },
            headers: {
                access_token: this.access_token
            }
            })
            .then(response => {
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()
                successCRUD('Success add a new task')
            })
            .catch(err => console.log(err))
        },
        deleteTask(taskId) {
            console.log(taskId)
            axios({
                method:"DELETE",
                url: `/tasks/${taskId}`,
                headers: {
                    access_token: this.access_token
                }
            })
            .then(response => {
                console.log(response, "ni")
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()

            })
            .catch(err => {
                console.log(JSON.stringify(err.response.data, null, 2))
                Swal.fire('Error', err.response.data.message, 'error')
                // console.log(err.responseJSON.message)
            })
        },
        editTask(data){
            axios({
                method: "PUT",
                url: `/tasks/${data.id}`,
                headers: {
                    access_token: this.access_token
                },
                data: {
                    title: data.title,
                    description: data.description,
                }
            })
            .then(response => {       
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()

            })
            .catch(err => Swal.fire('Error', err.response.data.message, 'error'))
        },
        updateCatTask(data) {
            axios({
                method: "PATCH",
                url: `/tasks/${data.id}`,
                headers: {
                    access_token: this.access_token
                },
                data: {
                    CategoryId: data.CategoryId
                }
            })
            .then(response => {       
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()

            })
            .catch(err => {
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()

                Swal.fire('Error', err.response.data.message, 'error')
            })
        },
        updateCategoryDrag(data){
            axios({
                method: "PATCH",
                url: `/tasks/${data.id}`,
                headers: {
                    access_token: this.access_token
                },
                data: {
                    CategoryId: data.CategoryId
                }
            })
            .then(response => {       
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()

            })
            .catch(err => {
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()

                Swal.fire('Error', err.response.data.message, 'error')
            })
        },
        addCategory(data) {
            axios({
                method: "POST",
                url: "/categories",
                headers: {
                    access_token: this.access_token
                },
                data: {
                    name: data.name
                }
            })
            .then(response => {
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()
                successCRUD('Success add a new category')
            })
            .catch(err => console.log(err))
        },
        deleteCategory(id){
            console.log(id)
            axios({
                method:"DELETE",
                url: `/categories/${+id}`,
                headers: {
                    access_token: this.access_token
                }
            })
            .then(response => {
                console.log(response, "ni")
                this.fetchTask()
                this.fetchCategory()
                this.fetchConjUserOrganizationTask()
            })
            .catch(err => {
                console.log(JSON.stringify(err.response.data, null, 2))
                Swal.fire('Error', err.response.data.message, 'error')
                // console.log(err.responseJSON.message)
            })
        },
        fetchConjUserOrganizationTask(token){
            axios({
                method: "GET",
                url: `/conjunctions`,
                headers: {
                    access_token: token || this.access_token
                }
            })
            .then(response => {
                this.conjunctions = response.data
                console.log(response.data)
            // console.log(JSON.stringify(response.data, null, 2))
            })
            .catch(err => console.log(err))
        }
    },
    components: {
        Navbar,
        Login,
        Register,
        Content
    },
    created(){
        this.checkToken()
    }
}
</script>

<style>

</style>
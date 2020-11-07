<template>
    <div>
        <Navbar 
            v-if="page !== 'login-page' && 
            page !== 'register-page'" 
            @logout="logout">
        </Navbar>
        <div class="container">
        <LoginPage 
            v-if="page == 'login-page'" 
            @changePage="changePage" 
            @fetchTasks="fetchTasks" 
            @login="login" 
            :userLogin="userLogin">
        </LoginPage>
        <RegisterPage 
            v-else-if="page == 'register-page'" 
            @changePage="changePage" 
            @fetchTasks="fetchTasks"
            @register="register">
        </RegisterPage>
        <HomePage 
            v-else-if="page == 'home-page'" 
            :tasks="tasks" 
            :errorMessage="errorMessage" 
            :show="show" 
            :taskAdd="taskAdd" 
            :getTaskById="getTaskById"
            :categories="categories"
            :clientId="clientId"
            @addTask="addTask"
            @getById="getById"
            @changeCategory="changeCategory"
            @editTitleTask="editTitleTask"
            @deleteTask="deleteTask"
            @fetchTasks="fetchTasks"
            >
        </HomePage>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/Register';
export default {
    name: 'App',
    data(){
        return {
            page: 'login-page',
            show: false,
            showEdit: false,
            server: 'https://kanban-web-app.herokuapp.com',
            userLogin: {
                email: '',
                password: ''
            },
            userRegister: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            tasks: '',
            taskAdd: {
                title: ''
            },
            getTaskById: {
                id: '',
                title: ''
            },
            errorMessage: '',
            categories: ['Backlog', 'Todo', 'Doing', 'Done'],
            clientId: process.env.CLIENT_ID
        }
    },
    components: {
        Navbar,
        HomePage,
        LoginPage,
        RegisterPage
    },
    methods: {
        changePage(name) {
            this.page = name;
        },
        login(){
            axios({
                method: 'POST',
                url: this.server + '/login',
                data: this.userLogin
            })
            .then(resp => {
                const access_token = resp.data.access_token;
                this.page = 'home-page';
                this.userLogin.email = '';
                this.userLogin.password = '';
                localStorage.setItem('access_token', access_token);
                location.reload();
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err);
                swal(err.response.statusText);
            })
        },
        register(){
            axios({
                method: 'POST',
                url: this.server + '/register',
                data: this.userRegister
            })
            .then(res => {
                this.page = 'login-page'
            })
            .catch(err => {
                swal(err.response.data.message);
            })
        },
        logout(){
            localStorage.clear();
            swal('Success logout');
            this.page = 'login-page';
        },
        addTask(){
            axios({
                method: 'POST',
                url: this.server + '/task',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.taskAdd.title
                }
            })
            .then(res => {
                if (res) {
                    swal('Success!! added task');
                    this.show = false;
                    this.fetchTasks();
                } else {
                    swal('Oops!! something wrong');
                }
            })
            .catch(err => {
                this.show = false;
                console.log(err);
                this.errorMessage = err.response.data.message;
            })
        },
        getById(id){
            axios({
                method: 'GET',
                url: this.server + `/task/${+id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                params: {
                    id: +id
                }
            })
            .then(resp => {
                this.showEdit = true;
                this.getTaskById.title = resp.data.title;
                this.getTaskById.id = resp.data.id;
            })
            .catch(err => {
                swal(err.response.data.message);
            })
        },
        changeCategory(category, id){
            axios({
                method: 'PATCH',
                url: this.server + `/task/${+id}`,
                params: +id,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    category: category
                }
            })
            .then(resp => {
                swal(`Task move to ${category}`);
                this.fetchTasks();
            })
            .catch(err => {
                swal(err.response.data.message);
            })
        },
        editTitleTask(id){
            axios({
                method: 'PUT',
                url: this.server + `/task/${+id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                params: {
                    id: +id
                },
                data: {
                    title: this.getTaskById.title
                }
            })
            .then(resp => {
                this.getTaskById.title = '';
                this.fetchTasks();
            })
            .catch(err => {
                swal(err.response.data.message);
            })
        },
        deleteTask(id){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    return axios({
                        method: 'DELETE',
                        url: this.server + `/task/${+id}`,
                        params: {
                            id: +id
                        },
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                }
            })
            .then(resp => {
                if (resp) {
                    swal("Success! task has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your task is safe!");
                }
                this.fetchTasks();
            })
            .catch(err => {
                swal(err.response.data.message);
            });
        },
        fetchTasks() {
            axios({
                method: 'GET',
                url: this.server + '/task',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(res => {
                this.tasks = res.data;
            })
            .catch(err => {
                swal('Something wrong');
            })
        },
    }, 
    created(){
        this.fetchTasks();
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            this.fetchTasks();
            this.page = 'home-page';
        } else {
            this.page = 'login-page';
        }
    }
}
</script>
    
<style>

</style>
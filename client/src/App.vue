<template>
    <div>
        <LoginPage v-if="page == 'login-page'">
        </LoginPage>
        <RegisterPage v-else-if="page == 'register-page'"></RegisterPage>
        <HomePage v-else-if="page == 'home-page'"></HomePage>
    </div>
</template>

<script>
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/Register';
export default {
    name: 'App',
    data(){
        return {
        page: 'home-page',
        show: false,
        showEdit: false,
        server: 'http://localhost:3000',
        tasks: '',
        taskAdd: {
            title: ''
        },
        getTaskById: {
            id: '',
            title: ''
        },
        errorMessage: '' 
        }
    },
    components: {
        HomePage,
        LoginPage,
        RegisterPage
    },
    methods: {
        changePage(name) {
            this.page = name;
        },
        logout(){
            localStorage.clear();
            swal('Success logout');
            this.page = 'login-page';
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
                    console.log(res);
                } else {
                    swal('Oops!! something wrong');
                }
            })
            .catch(err => {
                this.show = false;
                this.fetchTasks();
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
                console.log(category);
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
        }
    }
}
</script>
    
<style>

</style>
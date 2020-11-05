let app = new Vue({
    el: '#app',
    data: {
        page: 'login-page',
        show: false,
        showEdit: false,
        server: 'http://localhost:3000',
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
            title: ''
        } 
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
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err);
            })
        },
        logout(){
            localStorage.clear();
            this.page = 'login-page';
        },
        register(){
            axios({
                method: 'POST',
                url: this.server + '/register',
                data: this.userRegister
            })
            .then(res => {
                console.log(res);
                this.page = 'login-page'
            })
            .catch(err => {
                console.log(err);
            })
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
                console.log(err);
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
                this.show = false;
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err);
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
            })
            .catch(err => {
                console.log(err);
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
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
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
                console.log(err);
            })
        },
        deleteTask(id){
            axios({
                method: 'DELETE',
                url: this.server + `/task/${+id}`,
                params: {
                    id: +id
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(resp => {
                this.fetchTasks();
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    created() {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            this.fetchTasks();
            this.page = 'home-page';
        } else {
            this.page = 'login-page';
        }
    }
})

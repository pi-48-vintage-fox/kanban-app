let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello vue',
        page: 'login-page',
        show: false,
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
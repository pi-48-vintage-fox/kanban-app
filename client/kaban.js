
var app = new Vue({
  el: '#app',
  data: {
    email: '',
    password: '',
    name: this.email,
    isLogin: false,
    task: [],
    baseUrl: 'http://localhost:3000'
  },

  methods: {
    // Login
    login() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(response => {
        const access_token = response.data.access_token
        localStorage.setItem("access_token", access_token)
        isLogin = true
      })
      .catch(err => {
        isLogin = false
      })
    },

    //  Logout
    logout() {
      localStorage.removeItem('access_token')
      this.isLogin = false
      console.log('Ada token pula');
    },

    // Fetch Task
    fetchTask() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/task`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(response => {
        response.data.forEach(el => {
           el.createdAt = `${el.createdAt.slice(0,10)} ${el.createdAt.slice(11,16)}`
        })
        this.task = response.data
      })
      .catch(err => {
        console.log(err);
      })
    }

  },

  created() {
    if (localStorage.access_token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
    this.fetchTask()
  },

  computed: {
    categoryBacklogFil() {
      var backlogTask = this.task.filter(el => el.category == 'backlog')
      return backlogTask
    },
    categoryToDoFil() {
      var toDoTask = this.task.filter(el => el.category == 'to do')
      return toDoTask
    },
    categoryDoingFil() {
      var doingTask = this.task.filter(el => el.category == 'doing')
      return doingTask
    },
    categoryDoneFil() {
      var doneTask = this.task.filter(el => el.category == 'done')
      return doneTask
    }
  }

})
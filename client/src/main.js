import Vue from 'vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'

new Vue({
  render: h => h(App),
  GoogleSignInButton,
}).$mount('#app');



// let app = new Vue({
//     el: '#app',
//     data: {
//       pageName: "content-page",
//       server: "http://localhost:3000",
//       errorMsg: "",
//       access_token: localStorage.access_token || null,
//       tasks: [],
//       categories: [],
//       taskAdd: {
//         id: "",
//         title: "",
//         CategoryId: ""
//       },
//       idCategory: 0
//     },
//     methods: {
      // fetchTask(){
      //   axios({
      //     method: "GET",
      //     url: `${this.server}/tasks`,
      //     headers: {
      //       access_token: this.access_token
      //     }
      //   })
      //   .then(response => {
      //     this.tasks = response.data
      //     // console.log(JSON.stringify(response.data, null, 2))
      //   })
      //   .catch(err => console.log(err))
      // },
      // fetchCategory(){
      //   axios({
      //     method: "GET",
      //     url: `${this.server}/category`,
      //     headers: {
      //       access_token: this.access_token
      //     }
      //   })
      //   .then(response => {
      //     this.categories = response.data
      //     // console.log(JSON.stringify(response.data, null, 2))
      //   })
      //   .catch(err => console.log(err))
      // },
//       formAdd(categoryId){
//         this.taskAdd.CategoryId = categoryId
//       },
      // deleteTask(taskId) {
      //   console.log(taskId)
      //   axios({
      //     method:"DELETE",
      //     url: `${this.server}/tasks/${taskId}`,
      //     headers: {
      //       access_token: this.access_token
      //     }
      //   })
      //   .then(response => {
      //     console.log(response.data, "ni")
      //     this.fetchTask()
      //     this.fetchCategory()
      //   })
      //   .catch(err => console.log(JSON.stringify(err, null, 2)))
      // },
      // formEditTask(taskId) {
      //   this.taskAdd.id = taskId
      // },
//       editTask(taskId){
//         axios({
//           method: "PUT",
//           url: `${this.server}/tasks/${taskId}`,
//           headers: {
//             access_token: this.access_token
//           },
//           data: {
//             title: this.taskAdd.title,
//           }
//         })
//         .then(response => {
//           this.taskAdd.id = ""
//           this.taskAdd.title = ""          
//           this.fetchTask()
//           this.fetchCategory()
//         })
//         .catch(err => console.log(err))
//       }
//     },
//     created(){
//       this.fetchTask()
//       this.fetchCategory()
//     },
//     mounted() {

//     }
// })
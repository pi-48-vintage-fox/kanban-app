import Vue from 'vue'
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue ({
  render: x => x(App)
}).$mount('#app')

// const app = new Vue ({
//   // el: '#app',
//   data: {
//     categories: '',
//     inPage: 'landingPage',
//     isRegister: false,
//     loginEmail: '',
//     loginPassword: '',
//     organizations: '',
//     registerEmail: '',
//     registerPassword: '',
//     server: 'http://localhost:3000',
//     showTasks: false
//   },
//   methods: {
//     changePage(page) {
//       this.inPage = page;
//     },
//     changeShowTasks(val) {
//       this.showTasks = val
//     },
//     getCategories(orgId) {
//       axios({
//         method: 'GET',
//         url: this.server + '/categories/' + orgId,
//         headers: {
//           token: localStorage.getItem("token")
//         }
//       })
//         .then(result => {
//           console.log(result.data);
//           let categoriesNames = result.data.map(element => {
//             return element.name
//           })
//           this.categories = categoriesNames;
//           this.changeShowTasks(true);
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     },
//     getOrganizations() {
//       axios({
//         method: 'GET',
//         url: this.server + '/organizations'
//       })
//         .then(result => {
//           this.organizations = result.data;
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     },
//     hideRegister() {
//       this.isRegister = false;
//     },
//     hideTasks() {
//       this.changeShowTasks(false)
//     },
//     login() {
//       axios({
//         method: 'POST',
//         url: this.server + '/login',
//         data: {
//           email: this.loginEmail,
//           password: this.loginPassword
//         }
//       })
//         .then(result => {
//           localStorage.setItem("token", result.data.token);
//           this.changePage('homePage');
//           this.getOrganizations();
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     },
//     logout() {
//       localStorage.clear();
//       this.changeShowTasks(false);
//       this.changePage('landingPage');
//     },
//     ready() {
//       if(localStorage.getItem("token")) {
//         this.inPage = 'homePage';
//         this.getOrganizations();
//       } else {
//         this.inPage = 'landingPage'
//       }
//     },
//     register() {
//       axios({
//         method: 'POST',
//         url: this.server + '/register',
//         data: {
//           email: this.registerEmail,
//           password: this.registerPassword
//         }
//       })
//         .then(result => {
//           this.changePage('landingPage')
//         })
//         .catch(err => {
//           console.log(err)
//           // Swal.fire({
//           //   icon: 'error',
//           //   title: 'Oops...',
//           //   text: 'Something went wrong!'
//           // })
//         })
//     },
//     showRegister() {
//       this.isRegister = true
//     }
//   },
//   created() {
//     this.ready()
//   }
// })
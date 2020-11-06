import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import GoogleSignInButton from 'vue-google-signin-button-directive'




new Vue({
  render: h => h(App),
  GoogleSignInButton,
}).$mount('#app');
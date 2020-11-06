import Vue from 'vue'
import App from './App.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GoogleSignInButton from 'vue-google-signin-button-directive'

new Vue ({
  render: x => x(App),
  GoogleSignInButton
}).$mount('#app')

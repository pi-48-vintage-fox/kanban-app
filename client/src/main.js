import Vue from 'vue'
import app from './app.vue'
import VueToastify from "vue-toastify";

new Vue({
  render: h=>h(app),
}).$mount('#app')

Vue.use(VueToastify,{
  position: "top-center"
})

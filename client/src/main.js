import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'

Vue.use(PortalVue)

new Vue({
  render: (h) => h(App),
}).$mount('#app')

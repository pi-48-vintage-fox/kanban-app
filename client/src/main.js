import Vue from 'vue'
import app from './app.vue'
import VueToastify from "vue-toastify";
import VueDraggable from 'vue-draggable'
import VTooltip from 'v-tooltip'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'
import GSignInButton from 'vue-google-signin-button'

new Vue({
  render: h=>h(app),
}).$mount('#app')

Vue.use(new VueSocketIO({
  debug:false,
  connection: socketio("http://localhost:3000",{transports:['websocket']})
}))

Vue.use(VueToastify,{
  position: "top-center"
})

Vue.use(VueDraggable)
Vue.use(VTooltip)
Vue.use(GSignInButton)

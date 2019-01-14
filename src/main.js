// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { router } from '@/preset/router.js'
import App from '@/App.vue'
import store from '@/preset/store.js'
Vue.use(VueRouter)
/* eslint-disable */
new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})

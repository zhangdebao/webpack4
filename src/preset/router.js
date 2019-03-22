import VueRouter from 'vue-router'
import Home from '@/components/home.vue'
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})
export { router }

import VueRouter from 'vue-router'
import PDF from '@/components/pdf/index.vue'
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: PDF
    }
  ]
})
export { router }

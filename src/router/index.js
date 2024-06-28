import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Converter from '../views/Converter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/converter',
      name: 'Converter',
      component: Converter
    }
  ]
})

export default router

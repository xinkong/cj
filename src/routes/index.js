import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './../pages/Home.vue'
import Win from './../pages/Win.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    meta: { keepAlive: false },
    component: Home,
  },
  {
    path: '/win',
    name: 'win',
    meta: { keepAlive: false },
    component: Win,
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router

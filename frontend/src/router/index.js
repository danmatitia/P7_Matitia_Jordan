import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Accueil.vue'

const routes = [
  {
    path: "/",
    name: "feed",
    component: () => import("../views/feed.vue"),
  },
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/profile.vue')
  },
  {
    path: "/messages/:id",
    name: "messages",
    component: () => import('../views/oneMessages.vue'),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

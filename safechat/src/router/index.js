import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/views/Users.vue') },
      { path: '/chat/:otherUserId', component: () => import('../views/Chat.vue') },
      { path: '/auth', component: () => import('@/views/Auth.vue') },
    ]
  },
  { path: '*', component: () => import('@/views/404.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production'
    ? '/safechat/'
    : '/',
  routes
})

export default router

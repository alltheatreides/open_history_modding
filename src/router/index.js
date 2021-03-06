import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import SearchHistory from '../views/SearchHistoryView.vue'
import CreateHistory from '../views/CreateHistoryView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import EBACView from '../views/EBACView.vue'
import NotFound from '../views/404View.vue'
import UserProfileView from '../views/UserProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/register',
      name: 'register',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/ebac',
      name: 'ebac',
      component: EBACView
    },
    { path: '/404', component: NotFound },

    { path: '/:catchAll(.*)', redirect: '404' },
    {
      path: '/vanilla-history',
      name: 'vanillaHistory',
      component: SearchHistory
    },
    {
      path: '/create-history',
      name: 'createHistory',
      component: CreateHistory
    },
    {
      path: '/test',
      name: 'test',
      component: UserProfileView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

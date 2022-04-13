import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ForumView from '@/views/ForumView.vue'
import ProfilView from '@/views/ProfilView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/forum',
    name: 'forum',
    component: ForumView
  },
  {
    path: '/profil',
    name: 'profil',
    component: ProfilView
  }
]

const router = new VueRouter({
  routes
})

export default router

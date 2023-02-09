import VueRouter from 'vue-router'
import routes from './routes'
import secureStorage from '@/utils/secureStorage'

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const user = secureStorage.getItem('user')
  if (to.matched.some(record => record.meta.auth) && !user) {
    next('/login')
    return
  }
  next()
})

export default router

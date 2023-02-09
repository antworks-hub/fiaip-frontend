
import router from '@/routes/router.js'

import secureStorage from '@/utils/secureStorage'

const PermissionsPlugin = {
  install (Vue, options) {
    Vue.prototype.$isAdmin = function () {
      const userObject = JSON.parse(secureStorage.getItem('user'))
      const user = userObject ? userObject.user : false
      if (user) {
        const isAdmin = user.admin
        return isAdmin
      } else {
        return false
      }
    }

    router.beforeEach((to, from, next) => {
      if (to.meta && to.meta.needsAdmin) {
        if (to.meta.action && Array.isArray(to.meta.action)) {
          if (to.meta.action.every(act => !Vue.prototype.$isAdmin)) {
            next('/')
          }
        } else if (to.meta.action) {
          if (!Vue.prototype.$isAdmin) {
            next('/')
          }
        }
      }
      next()
    })
  }
}

export default PermissionsPlugin

import axios from 'axios'
import store from '@/store/index.js'
import router from '@/routes/router.js'

const ApiInterceptorPlugin = {
  install (Vue, options) {
    axios.interceptors.response.use(function (response) {
      Vue.initLockScreenTimeout()
      return Promise.resolve(response)
    }, function (error) {
      if (error.response.status === 401) {
        store.dispatch('auth/forceLogout')
        if(router.currentRoute.path != '/login') {
          router.push('/login')
        }
      }
      if (error.response.status === 422) {
        const errorMessage = error.response.data.content.message
        const message = typeof errorMessage === 'string'
          ? errorMessage
          : 'Sono presenti errori di validazione'
        Vue.prototype.$notify({
          message,
          timeout: 5000,
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      }
      if (error.response.status === 500 || error.response.status === 404) {
        Vue.prototype.$notify({
          message: 'Errore di comunicazione con il server',
          timeout: 5000,
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'danger'
        })
      }
      return Promise.reject(error)
    })
  }
}

export default ApiInterceptorPlugin

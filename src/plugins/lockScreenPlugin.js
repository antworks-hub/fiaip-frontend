import store from '@/store/index.js'

const lockScreenPlugin = {
  install (Vue, opts) {
    Vue.lockScreenTimeout = null

    Vue.getLockScreenTimeout = function () {
      return Vue.lockScreenTimeout
    }

    Vue.initLockScreenTimeout = function () {
      clearTimeout(Vue.getLockScreenTimeout())
      Vue.lockScreenTimeout = setTimeout(() => {
        store.dispatch('settings/toggleLockScreen')
      }, 2700000)
    }

    Vue.clearLockScreenTimeout = function () {
      clearTimeout(Vue.getLockScreenTimeout())
      store.dispatch('settings/toggleLockScreen')
    }
  }
}

export default lockScreenPlugin

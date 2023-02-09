import axios from 'axios'
import secureStorage from '@/utils/secureStorage'

const auth = {
  namespaced: true,

  state: {
    user: null
  },

  getters: {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    masterPassword: state => state.masterPassword,
    abilities: state => state.user ? state.user.abilities : []
  },

  actions: {
    reload (context) {
      return new Promise((resolve, reject) => {
        if (secureStorage.getItem('user')) {
          const storedUser = JSON.parse(secureStorage.getItem('user'))
          axios.defaults.headers.common.Authorization = `Bearer ${storedUser.token}`
          axios.post('/me').then((response) => {
            context.commit('SET_USER', response.data)
            resolve()
          }, (error) => {
            context.commit('UNSET_USER')
            reject(error)
          })
        } else {
          resolve()
        }
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/login', payload).then((response) => {
          context.commit('SET_USER', response.data)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        axios.post('/logout').then((response) => {
          context.commit('UNSET_USER', response.data)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    forceLogout (context) {
      context.commit('UNSET_USER')
    },
    update (context, data) {
      return new Promise((resolve, reject) => {
        axios.put('/edit-me', data).then((response) => {
          context.commit('SET_USER', response.data)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    forgotPassword (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/forgot-password', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    resetPassword (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/reset-password', data).then((response) => {
          context.commit('SET_USER', response.data)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    firstAccess (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/first-access', data).then((response) => {
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    },
    setPassword (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/set-password', data).then((response) => {
          context.commit('SET_USER', response.data)
          resolve(response)
        }, (error) => {
          reject(error)
        })
      })
    }
  },

  mutations: {
    SET_USER (state, data) {
      state.user = data.user
      state.masterPassword = data.master_password
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      secureStorage.setItem('user', JSON.stringify(data))
    },
    UNSET_USER (state) {
      state.user = null
      axios.defaults.headers.common.Authorization = null
      secureStorage.removeItem('user')
    }
  }
}

export default auth

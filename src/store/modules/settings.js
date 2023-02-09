import Crud from '../utils/crud'
const crud = new Crud('/settings')

const state = () => ({
  ...crud.state,
  lockScreen: false,
  darkMode: false,
  sidebarMinimized: false
})
const getters = {
  ...crud.getters,
  lockScreen: state => state.lockScreen,
  darkMode: state => state.darkMode,
  sidebarMinimized: state => state.sidebarMinimized

}
const actions = {
  ...crud.actions,
  toggleLockScreen (context) {
    context.commit('SET_LOCK_SCREEN')
  },
  toggleDarkMode (context) {
    context.commit('SET_DARKMODE')
  },
  toggleSidebarMinimized (context) {
    context.commit('SET_SIDEBAR_MINIMIZED')
  }
}
const mutations = {
  ...crud.mutations,
  SET_LOCK_SCREEN (state) {
    state.lockScreen = !state.lockScreen
  },
  SET_DARKMODE (state) {
    state.darkMode = !state.darkMode
  },
  SET_SIDEBAR_MINIMIZED (state) {
    state.sidebarMinimized = !state.sidebarMinimized
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

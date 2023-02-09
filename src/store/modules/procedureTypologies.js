import Crud from '../utils/crud'
const crud = new Crud('/procedure-typologies')

const state = () => ({
  ...crud.state
})
const getters = {
  ...crud.getters
}
const actions = {
  ...crud.actions
}
const mutations = {
  ...crud.mutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

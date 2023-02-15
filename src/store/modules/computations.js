import Crud from '../utils/crud'
const crud = new Crud('/computations')
import axios from 'axios'

const state = () => ({
  ...crud.state
})
const getters = {
  ...crud.getters
}
const actions = {
  ...crud.actions,

  async calculate (context, id) {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    context.commit('SET_CANCEL_TOKEN', source)
    return await new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${context.state.endpoint}/${id}/calculate`,
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token
      }).then((response) => {
        context.commit('SET_SINGLE_PAYLOAD', response)
        resolve(response)
      }, (error) => {
        reject(error)
      })
    })
  },
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

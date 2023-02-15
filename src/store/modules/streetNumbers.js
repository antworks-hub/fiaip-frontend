import Crud from '../utils/crud'
const crud = new Crud('/street-numbers')
import axios from 'axios'

const state = () => ({
  ...crud.state
})
const getters = {
  ...crud.getters
}
const actions = {
  ...crud.actions,

  async fetchStreetNumbersByStreet (context, id) {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    context.commit('SET_CANCEL_TOKEN', source)
    return await new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `${context.state.endpoint}-by-street/${id}`,
        headers: { 'Content-Type': 'application/json' },
        cancelToken: source.token
      }).then((response) => {
        context.commit('SET_COLLECTION_PAYLOAD', response)
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

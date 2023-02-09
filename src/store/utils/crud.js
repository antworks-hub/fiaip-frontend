import axios from 'axios'
import qs from 'qs'

export default class {
  constructor (endpoint) {
    this.state = {
      endpoint,
      collectionPayload: null,
      singlePayload: null,
      cancelToken: null
    }

    this.getters = {
      items: state => state.collectionPayload ? state.collectionPayload.content.data : [],
      meta: state => state.collectionPayload ? state.collectionPayload.content.meta : {},
      single: state => state.singlePayload ? state.singlePayload.content : null
    }

    this.actions = {
      async fetch (context, payload) {
        const cleanedPayload = clean(Object.assign({}, payload))
        const cancelToken = axios.CancelToken
        const source = cancelToken.source()
        context.commit('SET_CANCEL_TOKEN', source)
        return await new Promise((resolve, reject) => {
          axios({
            method: 'GET',
            url: context.state.endpoint,
            headers: { 'Content-Type': 'application/json' },
            cancelToken: source.token,
            params: cleanedPayload,
            paramsSerializer: (params) => { return qs.stringify(params, { encode: false }) }
          }).then((response) => {
            context.commit('SET_COLLECTION_PAYLOAD', response)
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      async get (context, id) {
        return await new Promise((resolve, reject) => {
          axios({
            method: 'GET',
            url: `${context.state.endpoint}/${id}`,
            headers: { 'Content-Type': 'application/json' }
          }).then((response) => {
            context.commit('SET_SINGLE_PAYLOAD', response)
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      async create (context, { payload }) {
        const cleanedPayload = clean(Object.assign({}, payload))
        return await new Promise((resolve, reject) => {
          axios({
            method: 'POST',
            url: context.state.endpoint,
            data: cleanedPayload,
            headers: { 'Content-Type': 'application/json' }
          }).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      async clone (context, id) {
        return await new Promise((resolve, reject) => {
          axios({
            method: 'POST',
            url: `${context.state.endpoint}/${id}/clone`,
            headers: { 'Content-Type': 'application/json' }
          }).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      async update (context, { id, payload }) {
        const cleanedPayload = clean(Object.assign({}, payload))
        return await new Promise((resolve, reject) => {
          axios({
            method: 'PUT',
            url: id ? `${context.state.endpoint}/${id}` : context.state.endpoint,
            data: cleanedPayload,
            headers: { 'Content-Type': 'application/json' }
          }).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      async delete (context, id) {
        return await new Promise((resolve, reject) => {
          axios({
            method: 'DELETE',
            url: `${context.state.endpoint}/${id}`,
            headers: { 'Content-Type': 'application/json' }
          }).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        })
      },

      updateValue (context, newValue) {
        const payload = { data: { content: { ...newValue } } }
        context.commit('SET_SINGLE_PAYLOAD', payload)
      },

      resetItems (context) {
        context.commit('CLEAR_COLLECTION_PAYLOAD')
      },

      resetSingle (context) {
        context.commit('CLEAR_SINGLE_PAYLOAD')
      }
    }

    this.mutations = {
      SET_CANCEL_TOKEN (state, source) {
        if (state.cancelToken) {
          state.cancelToken.cancel()
        }
        state.cancelToken = source
      },

      SET_COLLECTION_PAYLOAD (state, response) {
        state.collectionPayload = response.data
      },

      SET_SINGLE_PAYLOAD (state, response) {
        state.singlePayload = response.data
      },

      CLEAR_COLLECTION_PAYLOAD (state) {
        state.collectionPayload = null
      },

      CLEAR_SINGLE_PAYLOAD (state) {
        state.singlePayload = null
      }
    }

    function clean (obj) {
      for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName]
        } else if (typeof obj[propName] === 'object') {
          clean(obj[propName])
        }
      }
      return obj
    }
  }
}

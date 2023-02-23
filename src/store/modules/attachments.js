import Crud from '../utils/crud'
import axios from 'axios';
const crud = new Crud('/attachments')

const state = () => ({
  ...crud.state
})
const getters = {
  ...crud.getters
}
const actions = {
  ...crud.actions,

    async upload(context, {payload, path}) {
      var headers = {'Content-Type': 'multipart/form-data'}
      var formData = generateFormData(payload, 'POST');

      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `${context.state.endpoint}${path}`,
          data: formData,
          headers: headers
        }).then(response => {
          resolve(response);
        }, error => {
          reject(error);
        })
      });
    },

    async delete(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `${context.state.endpoint}/${payload}`,
          headers: {'Content-Type': 'application/json'}
        }).then(response => {
          resolve(response);
        }, error => {
          reject(error);
        })
      });
    }
}
const mutations = {
  ...crud.mutations
}

function generateFormData(payload, method) {
  let formData = new FormData();
  formData.append('file', payload.file);
  formData.append('name', payload.name);
  formData.append('type', payload.attachment_type_id);
  return formData;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

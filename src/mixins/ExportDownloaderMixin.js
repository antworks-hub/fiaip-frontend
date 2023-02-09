import axios from 'axios'
import qs from 'qs'

export default {
  methods: {
    downloadExport (url, payload) {
      const cleanedPayload = this.clean(Object.assign({}, payload))
      axios({
        method: 'GET',
        url,
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob',
        params: cleanedPayload,
        paramsSerializer: (params) => { return qs.stringify(params, { encode: false }) }
      }).then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const filename = response.headers['x-content-filename']
        const fileURL = URL.createObjectURL(blob)

        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.download = filename
        tempLink.href = fileURL
        tempLink.setAttribute('target', '_blank')
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
      })
    },

    clean (obj) {
      for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName]
        } else if (typeof obj[propName] === 'object') {
          this.clean(obj[propName])
        }
      }
      return obj
    }
  }
}

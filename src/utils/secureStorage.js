import SecureStorage from 'secure-web-storage'

const CryptoJS = require('crypto-js')

const SECRET_KEY = process.env.VUE_APP_SECURE_STORAGE_KEY

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash (key) {
    key = CryptoJS.SHA256(key, SECRET_KEY)
    return key.toString()
  },
  encrypt: function encrypt (data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY)
    data = data.toString()
    return data
  },
  decrypt: function decrypt (data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY)
    data = data.toString(CryptoJS.enc.Utf8)
    return data
  }
})

export default secureStorage

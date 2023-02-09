import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import admins from '@/store/modules/admins'
import auth from '@/store/modules/auth'
import dashboard from '@/store/modules/dashboard'
import procedureTypologies from '@/store/modules/procedureTypologies'
import settings from '@/store/modules/settings'
import tenders from '@/store/modules/tenders'
import userLevels from '@/store/modules/userLevels'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    admins,
    auth,
    dashboard,
    procedureTypologies,
    settings,
    tenders,
    userLevels
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import areas from '@/store/modules/areas'
import attachments from '@/store/modules/attachments'
import auth from '@/store/modules/auth'
import dashboard from '@/store/modules/dashboard'
import districts from '@/store/modules/districts'
import elements from '@/store/modules/elements'
import errors from '@/store/modules/errors'
import errorStatuses from '@/store/modules/errorStatuses'
import locationRanges from '@/store/modules/locationRanges'
import settings from '@/store/modules/settings'
import streetNumbers from '@/store/modules/streetNumbers'
import streets from '@/store/modules/streets'
import userLevels from '@/store/modules/userLevels'
import users from '@/store/modules/users'
import zipCodes from '@/store/modules/zipCodes'
import contractTypes from '@/store/modules/contractTypes'
import fornitures from '@/store/modules/fornitures'
import constraints from '@/store/modules/constraints'
import computations from '@/store/modules/computations'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    areas,
    attachments,
    auth,
    dashboard,
    districts,
    elements,
    errors,
    errorStatuses,
    locationRanges,
    settings,
    streetNumbers,
    streets,
    userLevels,
    users,
    zipCodes,
    contractTypes,
    fornitures,
    constraints,
    computations
  }
})

export default store

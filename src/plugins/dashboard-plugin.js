// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import 'src/polyfills'
// Validation plugin used to validate forms
import * as VeeValidate from 'vee-validate'
import { localize } from 'vee-validate'
// A plugin file where you could register global components used across the app
import mdiVue from 'mdi-vue'
import * as mdijs from '@mdi/js'
import lang from 'element-ui/lib/locale/lang/it'
import locale from 'element-ui/lib/locale'
import GlobalComponents from './globalComponents'
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'
// Lock Screen
import LockScreenPlugin from './lockScreenPlugin'
// Api Interceptor
import ApiInterceptorPlugin from './apiInterceptor'
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './sidebar'
// Notifications plugin. Used on Notifications page
import Notifications from './notifications'
// Permissions plugin.
import Permissions from './permissions'
import en from '@/locales/validation-en'

// element ui language configuration

// asset imports
import 'src/assets/css/nucleo-icons.css'
import 'src/assets/css/demo.css'
import 'src/assets/sass/app.scss'
locale.use(lang)
localize({
  en
})
localize('en')

export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(LockScreenPlugin)
    Vue.use(ApiInterceptorPlugin)
    Vue.use(SideBar)
    Vue.use(Notifications)
    Vue.use(Permissions)
    Vue.use(VeeValidate, {
      mode: 'eager',
      fieldsBagName: 'veeFields'
    })
    Vue.use(mdiVue, {
      icons: mdijs
    })
  }
}

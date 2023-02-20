import AuthLayout from 'src/theme/layouts/AuthLayout.vue'
import secureStorage from '@/utils/secureStorage'

// Auth Pages
const Login = () =>
  import(/* webpackChunkName: "auth" */ 'src/pages/Auth/Login.vue')
const ForgotPassword = () =>
  import(/* webpackChunkName: "auth" */ 'src/pages/Auth/ForgotPassword.vue')
const ResetPassword = () =>
  import(/* webpackChunkName: "auth" */ 'src/pages/Auth/ResetPassword.vue')
const FirstAccess = () =>
  import(/* webpackChunkName: "auth" */ 'src/pages/Auth/FirstAccess.vue')

const authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  beforeEnter: (to, from, next) => {
    const user = secureStorage.getItem('user')
    if (user) {
      next('/calcoli')
    }
    next()
  },
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/password-dimenticata',
      name: 'Password Dimenticata',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'Reset Password',
      component: ResetPassword
    },
    {
      path: '/primo-accesso',
      name: 'Primo Accesso',
      component: FirstAccess
    }
  ]
}

export default authPages

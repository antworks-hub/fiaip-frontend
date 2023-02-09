import NotFound from 'src/pages/General/NotFoundPage.vue'

import authPages from './auth.routes'
import dashboardPages from './dashboard.routes'

const routes = [
  {
    path: '/',
    redirect: '/riepilogo',
    name: 'Home'
  },
  authPages,
  dashboardPages,
  { path: '*', component: NotFound }
]

export default routes

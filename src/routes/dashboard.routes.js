import DashboardLayout from 'src/theme/layouts/DashboardLayout.vue'

import baseRoutes from '@/routes/dashboard/base.routes.js'

import usersRoutes from '@/routes/dashboard/users.routes.js'
import computationsRoutes from '@/routes/dashboard/computations.routes.js'

const dashboardPages = {
  path: '/',
  component: DashboardLayout,
  redirect: '/riepilogo',
  name: 'Dashboard layout',
  meta: {
    auth: true
  },
  children: [
    ...baseRoutes,
    ...usersRoutes,
    ...computationsRoutes
  ]
}

export default dashboardPages

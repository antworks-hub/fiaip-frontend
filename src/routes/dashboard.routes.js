import DashboardLayout from 'src/theme/layouts/DashboardLayout.vue'

import baseRoutes from '@/routes/dashboard/base.routes.js'

import tendersRoutes from '@/routes/dashboard/tenders.routes.js'
import adminRoutes from '@/routes/dashboard/admin.routes.js'

const dashboardPages = {
  path: '/',
  component: DashboardLayout,
  redirect: '/dashboard',
  name: 'Dashboard layout',
  meta: {
    auth: true
  },
  children: [
    ...baseRoutes,
    ...tendersRoutes,
    ...adminRoutes
  ]
}

export default dashboardPages

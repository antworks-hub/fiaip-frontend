const Dashboard = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Dashboard.vue')
const EditUserProfile = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/UserProfile/Edit.vue')

export default [
  {
    path: 'riepilogo',
    name: 'Dashboard',
    components: { default: Dashboard }
  },
  {
    path: '/me',
    name: 'Profilo',
    components: { default: EditUserProfile }
  }
]

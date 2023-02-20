const EditUserProfile = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/UserProfile/Edit.vue')

export default [
  {
    path: '/me',
    name: 'Profilo',
    components: { default: EditUserProfile }
  }
]

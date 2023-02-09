const ListAdmins = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Admins/List.vue')
const NewAdmin = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Admins/New.vue')
const EditAdmin = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Admins/Edit.vue')

export default [
  // ADMINS
  {
    path: 'amministratori',
    name: 'Amministratori',
    meta: { needsAdmin: true },
    components: { default: ListAdmins }
  },
  {
    path: 'amministratori/nuovo',
    name: 'Nuovo Amministratore',
    meta: { needsAdmin: true },
    components: { default: NewAdmin }
  },
  {
    path: 'amministratori/:id/modifica',
    name: 'Modifica Amministratore',
    meta: { needsAdmin: true },
    components: { default: EditAdmin }
  }
]

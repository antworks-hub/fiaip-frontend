const ListUsers = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Users/List.vue')
const NewUser = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Users/New.vue')
const EditUser = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Users/Edit.vue')

export default [
  // ADMINS
  {
    path: '/utenti',
    name: 'Utenti',
    meta: { needsAdmin: true },
    components: { default: ListUsers }
  },
  {
    path: '/utenti/nuovo',
    name: 'Nuovo Utente',
    meta: { needsAdmin: true },
    components: { default: NewUser }
  },
  {
    path: '/utenti/:id/modifica',
    name: 'Modifica Utente',
    meta: { needsAdmin: true },
    components: { default: EditUser }
  }
]

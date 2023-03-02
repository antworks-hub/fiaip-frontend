const UserListErrors = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Errors/User/List.vue')
const AdminListErrors = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Errors/Admin/List.vue')
const NewError = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Errors/New.vue')
const UserEditError = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Errors/User/Edit.vue')
const AdminEditError = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Errors/Admin/Edit.vue')
const ViewError = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Errors/View.vue')

export default [
    {
        path: '/errori',
        name: 'Errori',
        meta: { needsAdmin: false },
        components: { default: UserListErrors }
    },
    {
        path: '/errori/nuovo',
        name: 'Nuovo Errore',
        meta: { needsAdmin: true },
        components: { default: NewError }
    },
    {
        path: '/errori/:id/modifica',
        name: 'Modifica Errore',
        meta: { needsAdmin: true },
        components: { default: UserEditError }
    },
    {
        path: '/errori/:id/visualizza',
        name: 'Visualizza Errore',
        components: { default: ViewError }
    },


    {
        path: '/gestione-errori',
        name: 'Gestione Errori',
        meta: { needsAdmin: false },
        components: { default: AdminListErrors }
    },
    {
        path: '/gestione-errori/nuovo',
        name: 'Nuovo Errore',
        meta: { needsAdmin: true },
        components: { default: NewError }
    },
    {
        path: '/gestione-errori/:id/modifica',
        name: 'Modifica Errore',
        meta: { needsAdmin: true },
        components: { default: AdminEditError }
    }
]

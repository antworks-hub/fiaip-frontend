const ListAttachments = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Attachments/UsersList.vue')
const ManageAttachments = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Attachments/AdminsList.vue')
const NewAttachment = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Attachments/New.vue')
const EditAttachment = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Attachments/Edit.vue')

export default [
  {
    path: '/gestione-allegati',
    name: 'Allegati',
    meta: { needsAdmin: true },
    components: { default: ManageAttachments }
  },
  {
    path: '/allegati',
    name: 'Allegati',
    meta: { needsAdmin: false },
    components: { default: ListAttachments }
  },
  {
    path: '/allegati/nuovo',
    name: 'Nuovo Allegato',
    meta: { needsAdmin: true },
    components: { default: NewAttachment }
  },
  {
    path: '/allegati/:id/modifica',
    name: 'Modifica Allegato',
    meta: { needsAdmin: true },
    components: { default: EditAttachment }
  }
]

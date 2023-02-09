const ListTenders = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tenders/List.vue')
const NewTender = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tenders/New.vue')
const EditTender = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Tenders/Edit.vue')

export default [
  // ADMINS
  {
    path: 'tenders',
    name: 'Tenders',
    meta: { needsAdmin: true },
    components: { default: ListTenders }
  },
  {
    path: 'tenders/new',
    name: 'New Tender',
    meta: { needsAdmin: true },
    components: { default: NewTender }
  },
  {
    path: 'tenders/:id/edit',
    name: 'Edit Tender',
    meta: { needsAdmin: true },
    components: { default: EditTender }
  }
]

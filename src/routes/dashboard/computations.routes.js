const ListComputations = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Computations/List.vue')
const NewComputation = () =>
  import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Computations/New.vue')
const ViewComputation = () =>
    import(/* webpackChunkName: "dashboard" */ 'src/pages/Dashboard/Computations/View.vue')
export default [
  {
    path: '/calcoli',
    name: 'Elenco Calcoli',
    components: { default: ListComputations }
  },
  {
    path: '/calcoli/nuovo',
    name: 'Nuovo Calcolo',
    components: { default: NewComputation }
  },
  {
    path: 'calcoli/:id/visualizza',
    name: 'Visualizza Calcolo',
    components: { default: ViewComputation }
  }
]

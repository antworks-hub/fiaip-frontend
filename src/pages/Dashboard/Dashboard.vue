<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card>
          DASHBOARD
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Table, TableColumn } from 'element-ui'

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  created() {
    // this.fetchDashboardData()
  },
  computed: {
    ...mapGetters({
      // dashboardData: 'dashboard/items'
    })
  },
  methods: {
    ...mapActions({
      // fetchDashboardData: 'dashboard/fetch'
    })
  }
}
</script>
<style></style>

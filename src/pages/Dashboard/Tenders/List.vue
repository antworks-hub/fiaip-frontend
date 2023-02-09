<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="TENDERS"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="tenders"
          :search-fields="searchFields"
          :meta="meta"
          name-prop="last_name"
          new-button-label="NEW TENDER"
          @onNew="$router.push('tenders/new')"
          @onEdit="$router.push(`tenders/${$event.id}/edit`)"
          @onDelete="handleDelete($event.id)"
        />
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { ListTable } from '@/theme/components/index'

import secureStorage from '@/utils/secureStorage'

export default {
  components: {
    ListTable
  },

  data () {
    return {
      query: {
        rowsPerPage: 10,
        page: 1,
        sort: null,
        filter: {
          custom_search: ''
        }
      },
      pagination: {
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchFields: [
      ],
      tableColumns: [
        {
          prop: 'subject',
          label: 'Subject',
          sortable: true,
          minWidth: 200
        },
        {
          prop: 'procedure_typology.typology',
          label: 'Typology',
          sortable: true,
          minWidth: 200
        },
        {
          prop: 'start_date',
          label: 'Start Date',
          sortable: true,
          minWidth: 250
        },
        {
          prop: 'end_date',
          label: 'End Date',
          sortable: true,
          minWidth: 250
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      tenders: 'tenders/items',
      meta: 'tenders/meta'
    })
  },

  watch: {
    query: {
      handler () {
        this.handleFetch()
      },
      deep: true
    },
    meta: {
      handler (val) {
        this.pagination.total = val.total
      },
      deep: true
    }
  },

  created () {
    const storedQuery = JSON.parse(secureStorage.getItem('tableQuery'))
    if (storedQuery && storedQuery.entity === 'tenders') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clearTenders()
  },

  methods: {
    ...mapActions({
      fetchTenders: 'tenders/fetch',
      deleteTenders: 'tenders/delete',
      clearTenders: 'tenders/resetItems'
    }),
    handleFetch () {
      this.fetchTenders(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'tenders', query: this.query }))
    },
    handleDelete (id) {
      this.deleteTenders(id).then((res) => {
        this.fetchTenders(this.query)
        this.$notify({
          message:
            'Tender successfully deleted',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style></style>

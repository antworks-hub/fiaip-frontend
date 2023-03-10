<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ERRORI"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="errors"
          :search-fields="searchFields"
          :meta="meta"
          :creable="false"
          name-prop="last_name"
          @onEdit="$router.push(`gestione-errori/${$event.id}/modifica`)"
          @onShow="$router.push(`errori/${$event.id}/visualizza`)"
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
          prop: 'id',
          label: 'Numero',
          sortable: true,
        },
        {
          prop: 'user.full_name',
          label: 'Agente',
          sortable: true,
        },
        {
          prop: 'title',
          label: 'Titolo',
          sortable: true,
        },
        {
          prop: 'date',
          label: 'Data invio',
          sortable: true,
        },
        {
          prop: 'error_status.status',
          label: 'Stato',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      errors: 'errors/items',
      meta: 'errors/meta'
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
    if (storedQuery && storedQuery.entity === 'adminErrors') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clear_Errors()
  },

  methods: {
    ...mapActions({
      fetch_Errors: 'errors/fetch',
      delete_Error: 'errors/delete',
      clear_Errors: 'errors/resetItems'
    }),
    handleFetch () {
      this.fetch_Errors(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'adminErrors', query: this.query }))
    },
    handleDelete (id) {
      this.delete_Error(id).then((res) => {
        this.fetch_Errors(this.query)
        this.$notify({
          message:
            'Errore eliminato con successo.',
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

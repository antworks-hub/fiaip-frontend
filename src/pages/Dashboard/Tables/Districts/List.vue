<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO CIRCOSCRIZIONI"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="districts"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVA CIRCOSCRIZIONE"
          @onNew="$router.push('/tabelle/circoscrizioni/nuovo')"
          @onEdit="$router.push(`/tabelle/circoscrizioni/${$event.id}/modifica`)"
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
          prop: 'district_number',
          label: 'Codice',
          sortable: true,
        },
        {
          prop: 'district_name',
          label: 'Descrizione',
          sortable: true,
        },
      ]
    }
  },

  computed: {
    ...mapGetters({
      districts: 'districts/items',
      meta: 'districts/meta'
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
    if (storedQuery && storedQuery.entity === 'districts') {
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
      fetch_Districts: 'districts/fetch',
      delete_Districts: 'districts/delete',
      clear_Districts: 'districts/resetItems'
    }),
    handleFetch () {
      this.fetch_Districts(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'districts', query: this.query }))
    },
    handleDelete (id) {
      this.delete_Districts(id).then((res) => {
        this.fetch_Districts(this.query)
        this.$notify({
          message:
            'Circoscrizione eliminata con successo.',
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

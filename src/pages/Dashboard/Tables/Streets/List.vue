<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO Vie"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="streets"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVA VIA"
          @onNew="$router.push('/tabelle/vie/nuovo')"
          @onEdit="$router.push(`/tabelle/vie/${$event.id}/modifica`)"
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
          label: 'Codice',
          sortable: true,
        },
        {
          prop: 'street_name',
          label: 'Descrizione',
          sortable: true,
        },
        {
          prop: 'street_type',
          label: 'Tipo',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      streets: 'streets/items',
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
    if (storedQuery && storedQuery.entity === 'streets') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clear_Streets()
  },

  methods: {
    ...mapActions({
      fetch_Streets: 'streets/fetch',
      delete_Streets: 'streets/delete',
      clear_Streets: 'streets/resetItems'
    }),
    handleFetch () {
      this.fetch_Streets(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'streets', query: this.query }))
    },
    handleDelete (id) {
      this.delete_Streets(id).then((res) => {
        this.fetch_Streets(this.query)
        this.$notify({
          message:
            'Via eliminata con successo.',
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

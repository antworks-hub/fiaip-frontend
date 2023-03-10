<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO VIE"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="areas"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVA AREA"
          @onNew="$router.push('/tabelle/aree/nuovo')"
          @onEdit="$router.push(`/tabelle/aree/${$event.id}/modifica`)"
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
          prop: 'area_code',
          label: 'Codice',
          sortable: true,
        },
        {
          prop: 'area_name',
          label: 'Descrizione',
          sortable: true,
        },
      ]
    }
  },

  computed: {
    ...mapGetters({
      areas: 'areas/items',
      meta: 'areas/meta'
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
    if (storedQuery && storedQuery.entity === 'areas') {
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
      fetch_Areas: 'areas/fetch',
      delete_Area: 'areas/delete',
      clear_Areas: 'areas/resetItems'
    }),
    handleFetch () {
      this.fetch_Areas(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'areas', query: this.query }))
    },
    handleDelete (id) {
      this.delete_Area(id).then((res) => {
        this.fetch_Areas(this.query)
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

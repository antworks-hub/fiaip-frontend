<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO FASCE"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="locationRanges"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVA FASCIA"
          @onNew="$router.push('/tabelle/fasce/nuovo')"
          @onEdit="$router.push(`/tabelle/fasce/${$event.id}/modifica`)"
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
          prop: 'area.area_name',
          label: 'Area',
          sortable: true,
        },
        {
          prop: 'district.district_name',
          label: 'Distretto',
          sortable: true,
        },
        {
          prop: 'min_value',
          label: 'Valore minimo',
          sortable: true,
        },
        {
          prop: 'max_value',
          label: 'Valore Massimo',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      locationRanges: 'locationRanges/items',
      meta: 'locationRanges/meta'
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
    if (storedQuery && storedQuery.entity === 'elements') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clear_LocationRanges()
  },

  methods: {
    ...mapActions({
      fetch_LocationRanges: 'locationRanges/fetch',
      delete_LocationRanges: 'locationRanges/delete',
      clear_LocationRanges: 'locationRanges/resetItems'
    }),
    handleFetch () {
      this.fetch_LocationRanges(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'locationRanges', query: this.query }))
    },
    handleDelete (id) {
      this.delete_LocationRanges(id).then((res) => {
        this.fetch_LocationRanges(this.query)
        this.$notify({
          message:
            'Fascia eliminata con successo.',
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

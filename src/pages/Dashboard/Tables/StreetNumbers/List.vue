<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO CIVICI"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="streetNumbers"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVO CIVICO"
          @onNew="$router.push('/tabelle/civici/nuovo')"
          @onEdit="$router.push(`/tabelle/civici/${$event.id}/modifica`)"
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
          label: 'CivicoID',
          sortable: true,
        },
        {
          prop: 'district_id',
          label: 'CircoscrizioneID',
          sortable: true,
        },
        {
          prop: 'street_id',
          label: 'ViaID',
          sortable: true,
        },
        {
          prop: 'area.area_code',
          label: 'AreaID',
          sortable: true,
        },
        {
          prop: 'number_from',
          label: 'Numero Da',
          sortable: true,
        },
        {
          prop: 'number_to',
          label: 'Numero A',
          sortable: true,
        },
        {
          prop: 'number_type',
          label: 'NumeroTipo',
          sortable: true,
        },

      ]
    }
  },

  computed: {
    ...mapGetters({
      streetNumbers: 'streetNumbers/items',
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
    if (storedQuery && storedQuery.entity === 'streetNumbers') {
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
      fetch_StreetNumbers: 'streetNumbers/fetch',
      delete_StreetNumbers: 'streetNumbers/delete',
      clear_StreetNumbers: 'streetNumbers/resetItems'
    }),
    handleFetch () {
      this.fetch_StreetNumbers(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'streetNumbers', query: this.query }))
    },
    handleDelete (id) {
      this.delete_StreetNumbers(id).then((res) => {
        this.fetch_StreetNumbers(this.query)
        this.$notify({
          message:
            'Civico eliminato con successo.',
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

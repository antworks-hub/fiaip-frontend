<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO CAP"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="zipCodes"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVO CAP"
          @onNew="$router.push('/tabelle/cap/nuovo')"
          @onEdit="$router.push(`/tabelle/cap/${$event.id}/modifica`)"
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
          prop: 'zip_code',
          label: 'Cap',
          sortable: true,
        },
        {
          prop: 'numbers',
          label: 'Numeri',
          sortable: true,
        },
        {
          prop: 'street.printable_street_name',
          label: 'Strada',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      zipCodes: 'zipCodes/items',
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
    if (storedQuery && storedQuery.entity === 'zipCodes') {
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
      fetch_ZipCodes: 'zipCodes/fetch',
      delete_ZipCodes: 'zipCodes/delete',
      clear_ZipCodes: 'zipCodes/resetItems'
    }),
    handleFetch () {
      this.fetch_ZipCodes(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'ZipCodes', query: this.query }))
    },
    handleDelete (id) {
      this.delete_ZipCodes(id).then((res) => {
        this.fetch_ZipCodes(this.query)
        this.$notify({
          message:
            'Cap eliminato con successo.',
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

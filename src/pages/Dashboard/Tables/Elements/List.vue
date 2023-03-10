<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ELENCO ELEMENTI"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="elements"
          :search-fields="searchFields"
          :meta="meta"
          :showable="false"
          new-button-label="NUOVO ELEMENTO"
          @onNew="$router.push('/tabelle/elementi/nuovo')"
          @onEdit="$router.push(`/tabelle/elementi/${$event.id}/modifica`)"
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
          prop: 'description',
          label: 'Descrizione',
          sortable: true,
        },
        {
          prop: 'base_flag_html',
          label: 'Base',
          sortable: true,
        },
        {
          prop: 'renovation_flag_html',
          label: 'Rinnovamento',
          sortable: true,
        },
        {
          prop: 'number',
          label: 'Numero',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      elements: 'elements/items',
      meta: 'elements/meta'
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
    this.clear_Errors()
  },

  methods: {
    ...mapActions({
      fetch_Elements: 'elements/fetch',
      delete_Elements: 'elements/delete',
      clear_Elements: 'elements/resetItems'
    }),
    handleFetch () {
      this.fetch_Elements(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'elements', query: this.query }))
    },
    handleDelete (id) {
      this.delete_Elements(id).then((res) => {
        this.fetch_Elements(this.query)
        this.$notify({
          message:
            'Elemento eliminato con successo.',
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

<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="AMMINISTRATORI"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="admins"
          :search-fields="searchFields"
          :meta="meta"
          name-prop="last_name"
          new-button-label="NUOVO AMMINISTRATORE"
          @onNew="$router.push('amministratori/nuovo')"
          @onEdit="$router.push(`amministratori/${$event.id}/modifica`)"
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
          prop: 'first_name',
          label: 'Nome',
          sortable: true,
          minWidth: 200
        },
        {
          prop: 'last_name',
          label: 'Cognome',
          sortable: true,
          minWidth: 200
        },
        {
          prop: 'email',
          label: 'Email',
          sortable: true,
          minWidth: 250
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      admins: 'admins/items',
      meta: 'admins/meta'
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
    if (storedQuery && storedQuery.entity === 'admins') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clearAdmins()
  },

  methods: {
    ...mapActions({
      fetchAdmins: 'admins/fetch',
      deleteAdmin: 'admins/delete',
      clearAdmins: 'admins/resetItems'
    }),
    handleFetch () {
      this.fetchAdmins(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'admins', query: this.query }))
    },
    handleDelete (id) {
      this.deleteAdmin(id).then((res) => {
        this.fetchAdmins(this.query)
        this.$notify({
          message:
            'Amministratore eliminato con successo.',
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

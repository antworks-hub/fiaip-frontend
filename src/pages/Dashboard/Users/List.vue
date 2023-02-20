<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="UTENTI"
          @backClick="$router.back()"
        />

        <list-table
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="users"
          :search-fields="searchFields"
          :meta="meta"
          name-prop="last_name"
          new-button-label="NUOVO UTENTE"
          @onNew="$router.push('utenti/nuovo')"
          @onEdit="$router.push(`utenti/${$event.id}/modifica`)"
          @onDelete="handleDelete($event.id)"
          :showable="false"
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
        },
        {
          prop: 'last_name',
          label: 'Cognome',
          sortable: true,
        },
        {
          prop: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          prop: 'user_level.level',
          label: 'Livello',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      users: 'users/items',
      meta: 'users/meta'
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
    if (storedQuery && storedQuery.entity === 'users') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clear_Users()
  },

  methods: {
    ...mapActions({
      fetch_Users: 'users/fetch',
      delete_User: 'users/delete',
      clear_Users: 'users/resetItems'
    }),
    handleFetch () {
      this.fetch_Users(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'users', query: this.query }))
    },
    handleDelete (id) {
      this.delete_User(id).then((res) => {
        this.fetch_Users(this.query)
        this.$notify({
          message:
            'Utente eliminato con successo.',
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

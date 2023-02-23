<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ALLEGATI"
          @backClick="$router.back()"
        />

        <list-table
          :creable="false"
          :editable="false"
          :deletable="false"
          v-model="query"
          :pagination="pagination"
          :columns="tableColumns"
          :items="attachments"
          :search-fields="searchFields"
          :meta="meta"
          name-prop="name"
          new-button-label="NUOVO ALLEGATO"
          @onShow="openPreview"
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
          prop: 'name',
          label: 'Nome',
          sortable: true,
        },
        {
          prop: 'attachment_type.type',
          label: 'Tipo',
          sortable: true,
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      attachments: 'attachments/items',
      meta: 'attachments/meta'
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
    if (storedQuery && storedQuery.entity === 'attachments') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy () {
    this.clearAttachments()
  },

  methods: {
    ...mapActions({
      fetchAttachments: 'attachments/fetch',
      deleteAttachment: 'attachments/delete',
      clearAttachments: 'attachments/resetItems'
    }),
    handleFetch () {
      this.fetchAttachments(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'attachments', query: this.query }))
    },
    handleDelete (id) {
      this.deleteAttachment(id).then((res) => {
        this.fetchAttachments(this.query)
        this.$notify({
          message:
            'Allegato eliminato con successo.',
          timeout: 5000,
          icon: '',
          horizontalAlign: 'right',
          verticalAlign: 'top',
          type: 'success'
        })
      })
    },
    openPreview(row) {
      if(row.file.url) {
        if(!(row.file.url.includes('http://') || row.file.url.includes('https://'))) {
          window.open('https://' + row.file.url);
        } else {
          window.open(row.file.url);
        }
      }
    },
  }
}
</script>
<style></style>

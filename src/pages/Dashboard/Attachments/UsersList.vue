<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header
          title="ALLEGATI"
          @backClick="$router.back()"
        />
        <div class="mb-3 d-flex justify-content-start" :class="[ creable ? 'col-8' : 'col-12' ]">
          <base-input
            v-model="query.filter.custom_search"
            type="text"
            class="mr-3"
            placeholder="Cerca"
          />
        </div>
        <tabs type="primary">
          <tab-pane v-for="(attachmentType, index) in attachmentTypes" :key="index" :label="attachmentType.type">
            <list-table
                :creable="false"
                :editable="false"
                :deletable="false"
                :hideDefaultSearch="true"
                v-model="query"
                :pagination="pagination"
                :columns="tableColumns"
                :items="filterAttachmentByTipe(attachmentType.id)"
                :search-fields="searchFields"
                :meta="meta"
                name-prop="name"
                new-button-label="NUOVO ALLEGATO"
                @onShow="openPreview"
            />
          </tab-pane>
        </tabs>
      </card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Tabs, TabPane, ListTable } from '@/theme/components/index'
import secureStorage from '@/utils/secureStorage'

export default {
  components: {
    ListTable,
    Tabs,
    TabPane
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
      attachmentTypes: 'attachmentTypes/items',
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
    this.fetchAttachmentTypes()
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
      fetchAttachmentTypes: 'attachmentTypes/fetch',
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
    filterAttachmentByTipe(type) {
      return this.attachments.filter((attachment) => {
        return attachment.attachment_type_id == type
      })
    }
  }
}
</script>
<style></style>

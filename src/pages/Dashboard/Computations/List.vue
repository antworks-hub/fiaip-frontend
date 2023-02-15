<template>
  <div class="row">
    <div class="col-12">
      <card>
        <page-header title="CALCOLI LOCAZIONE" :query="query" @backClick="$router.back()" />
        <list-table v-model="query" :pagination="pagination" :columns="computedColumns" :items="computations" :meta="meta"
          :search-fields="searchFields" name-prop="business_name" hide-default-search :deletable="false"
          :editable="false" :creable="true"
          new-button-label="NUOVO CALCOLO"
          @onNew="$router.push('calcoli/nuovo')"
          @onShow="$router.push(`calcoli/${$event.id}/visualizza`)">

          <template #customActions="props">
            <el-tooltip content="Scarica PDF" :effect="props.darkMode ? 'light' : 'dark'"
              :open-delay="300" placement="top">
              <base-button class="edit btn-link" type="warning" size="sm" icon
                @click.native="downloadPdf(props.row)">
                <i v-if="!isDownloading" class="tim-icons icon-paper" />
                <i v-else class="fas fa-spinner fa-spin" />
              </base-button>
            </el-tooltip>
          </template>
        </list-table>
      </card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ListTable } from '@/theme/components/index'

import secureStorage from '@/utils/secureStorage'
import axios from 'axios'
import swal from "sweetalert2";

export default {
  components: {
    ListTable
  },

  data() {
    return {
      isDownloading: false,
      query: {
        rowsPerPage: 10,
        page: 1,
        sort: null,
        filter: {
          custom_search: '',
          quotation: false,
          reservation: false
        }
      },
      pagination: {
        perPageOptions: [5, 10, 25, 50],
        total: 0
      },
      searchFields: [
        {
          type: 'input',
          propName: 'custom_search',
          name: 'Nome'
        }
      ],
      tableColumns: [
        {
          prop: 'id',
          label: 'Id',
          sortable: true
        },
        {
          prop: 'user.last_name',
          label: 'Agente',
          sortable: true,
          admin: true
        },
        {
          prop: 'name_or_code',
          label: 'Cliente/Immobile',
          sortable: true
        },
        {
          prop: 'created_at',
          label: 'Data',
          sortable: true
        },
        {
          prop: 'street.street_name',
          label: 'Indirizzo'
        },
        {
          prop: 'street_number.number',
          label: 'Civico'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      computations: 'computations/items',
      meta: 'computations/meta'
    }),
    computedColumns() {
      if(this.user.admin) {
        return this.tableColumns
      }
      return this.tableColumns.filter(col => !col.admin)
    }
  },

  watch: {
    query: {
      handler() {
        this.handleFetch()
      },
      deep: true
    },
    meta: {
      handler(val) {
        this.pagination.total = val.total
      },
      deep: true
    }
  },

  created() {
    const storedQuery = JSON.parse(secureStorage.getItem('tableQuery'))
    if (storedQuery && storedQuery.entity === 'computations') {
      this.query = storedQuery.query
    } else {
      this.handleFetch()
    }
  },

  beforeDestroy() {
    this.clearComputations()
  },

  methods: {
    ...mapActions({
      fetchComputations: 'computations/fetch',
      clearComputations: 'computations/resetItems'
    }),
    handleFetch() {
      this.fetchComputations(this.query)
      secureStorage.setItem('tableQuery', JSON.stringify({ entity: 'computations', query: this.query }))
    },
    downloadPdf(computation) {
      let filename = 'Calcolo_' + computation.id + '.pdf'
      if(!this.isDownloading) {
        this.isDownloading = true;
        axios({
          url: '/computations/' + computation.id + '/download',
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(new Blob([response.data]))
          link.setAttribute('download', filename);
          link.click()
          this.isDownloading = false
        });
      }
    }
  }
}
</script>

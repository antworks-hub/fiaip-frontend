<template>
  <div class="row">
    <div class="mb-3 d-flex justify-content-start" :class="[ creable ? 'col-8' : 'col-12' ]">
      <base-input
        v-if="!hideDefaultSearch"
        :value="value.filter.custom_search"
        type="text"
        class="mr-3"
        placeholder="Cerca"
        @input="updateValue('filter.custom_search', $event)"
      />

      <div class="d-flex flex-column flex-sm-row">
        <span v-for="searchField in searchFields" :key="searchField.propName">
          <base-input
            v-if="searchField.type === 'input'"
            :value="value.filter[searchField.propName]"
            class="mr-3"
            type="text"
            :placeholder="searchField.name"
            @input="updateValue(`filter.${searchField.propName}`, $event)"
          />
          <base-input
            v-if="searchField.type === 'number'"
            :value="value.filter[searchField.propName]"
            class="mr-3"
            type="number"
            :placeholder="searchField.name"
            @input="updateValue(`filter.${searchField.propName}`, $event)"
          />
          <base-select
            v-else-if="searchField.type === 'select' && searchField.data.length"
            :item-value="searchField.listItemValue"
            :item-name="searchField.listItemLabel"
            class="mr-3"
            :value="value.filter[searchField.propName]"
            size="large"
            :items="searchField.data"
            :placeholder="searchField.name"
            clearable
            @input="updateValue(`filter.${searchField.propName}`, $event)"
          />
          <base-input
            v-else-if="searchField.type === 'datetime'"
            class="mr-3"
          >
            <el-date-picker
              :value="value.filter[searchField.propName]"
              type="datetime"
              :placeholder="searchField.name"
              format="dd/MM/yyyy HH:mm"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="'00:00:00'"
              @input="updateValue(`filter.${searchField.propName}`, $event)"
            />
          </base-input>
          <base-input
            v-else-if="searchField.type === 'date'"
            class="mr-3"
          >
            <el-date-picker
              :value="value.filter[searchField.propName]"
              type="date"
              :placeholder="searchField.name"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              @input="updateValue(`filter.${searchField.propName}`, $event)"
            />
          </base-input>
        </span>
      </div>

      <base-select
        v-if="listFilters.length"
        class="ml-3"
        :value="value.filter[listFiltersProp]"
        size="large"
        :items="listFilters"
        :placeholder="listFiltersLabel"
        clearable
        @input="updateValue('filter.' + listFiltersProp, $event)"
      />
    </div>
    <div v-if="creable" class="col-4 mb-3 d-flex justify-content-end">
      <slot name="newButton">
        <base-button
          type="info"
          @click="$emit('onNew')"
        >
          {{ newButtonLabel }}
        </base-button>
      </slot>
    </div>
    <div class="col-12" :class="selectable ? 'table-selectable' : null">
      <el-table :data="items"
        @sort-change="handleSort"
        @row-click="$emit('rowSelected', $event)"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          v-for="column in columns"
          :key="column.label"
          :min-width="column.minWidth"
          :max-width="column.maxWidth"
          :prop="column.prop"
          :formatter="column.formatter"
          :label="column.label"
          :sortable="column.sortable ? 'custom' : false"
        >
          <template slot-scope="scope">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span
              v-if="column.isHtml"
              v-html="column.prop.split('.').reduce(function(p, prop) {return column.globFn ? column.globFn(p) : column.fn ? column.fn(p[prop]) : p[prop]}, scope.row)"
            />
            <!-- eslint disable -->
            <span v-else>
              {{
                column.prop.split('.').reduce(function(p, prop) {
                  if(p) {
                    return column.fn ? column.fn(p[prop]) : p[prop]
                  } else {
                    return "--"
                  }
                }, scope.row)
              }}
              {{ column.append }}
            </span>
          </template>
        </el-table-column>
        <slot name="extraColumns" />
        <el-table-column v-if="hasActions" :min-width="actionsMinWidth" align="right" :label="actionsLabel">
          <div slot-scope="props">
            <slot name="customActions" :row="props.row" :darkMode="darkMode" />
            <el-tooltip
              v-if="hasChildren"
              content="Prodotti figli"
              :effect="darkMode ? 'light' : 'dark'"
              :open-delay="300"
              placement="top"
            >
              <base-button
                class="edit btn-link"
                type="warning"
                size="sm"
                icon
                @click.native="$emit('onChildren', props.row)"
              >
                <i class="tim-icons icon-credit-card" />
              </base-button>
            </el-tooltip>
            <el-tooltip
              v-if="clonable"
              content="Clona"
              :effect="darkMode ? 'light' : 'dark'"
              :open-delay="300"
              placement="top"
            >
              <base-button
                class="edit btn-link"
                type="warning"
                size="sm"
                icon
                @click.native="handleClone(props.row)"
              >
                <i class="tim-icons icon-single-copy-04" />
              </base-button>
            </el-tooltip>
            <el-tooltip
              v-if="showable"
              content="Visualizza"
              :effect="darkMode ? 'light' : 'dark'"
              :open-delay="300"
              placement="top"
            >
              <base-button
                class="edit btn-link"
                type="warning"
                size="sm"
                icon
                @click.native="$emit('onShow', props.row)"
              >
                <mdicon name="eye-outline" />
              </base-button>
            </el-tooltip>
            <el-tooltip
              v-if="editable && !props.row.uneditable"
              content="Modifica"
              :effect="darkMode ? 'light' : 'dark'"
              :open-delay="300"
              placement="top"
            >
              <base-button
                class="edit btn-link"
                type="warning"
                size="sm"
                icon
                @click.native.stop.prevent="$emit('onEdit', props.row)"
              >
                <i class="tim-icons icon-pencil" />
              </base-button>
            </el-tooltip>
            <el-tooltip
              v-if="deletable && !excludeFromDelete.includes(props.row.id)"
              content="Elimina"
              :effect="darkMode ? 'light' : 'dark'"
              :open-delay="300"
              placement="top"
            >
              <base-button
                class="remove btn-link"
                type="danger"
                size="sm"
                icon
                @click.native="handleDelete(props.row)"
              >
                <i class="tim-icons icon-simple-remove" />
              </base-button>
            </el-tooltip>
            <slot name="extraActions" :row="props.row" />
          </div>
        </el-table-column>
      </el-table>
    </div>

    <div class="col-12 d-flex justify-content-end flex-wrap">
      <label v-if="meta.from && meta.to" class="mr-3">
        Showing {{ meta.from }}-{{ meta.to }} of {{ pagination.total }}
      </label>
      <label v-else class="mr-3">
        No results found.
      </label>
    </div>

    <div class="col-6 d-flex justify-content-start flex-wrap">
      <rows-per-page
        :value="value"
        :options="pagination.perPageOptions"
        @inputRowsPerPage="updateValue('rowsPerPage', $event)"
      />
    </div>
    <div class="col-6 d-flex justify-content-end flex-wrap">
      <base-pagination
        :value="value.page"
        class="pagination-no-border"
        :per-page="value.rowsPerPage"
        :total="pagination.total"
        @input="updateValue('page', $event)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { Table, TableColumn, DatePicker } from 'element-ui'
import { BasePagination, RowsPerPage } from 'src/theme/components'

import FormUpdaterMixin from 'src/mixins/FormUpdaterMixin.js'

import swal from 'sweetalert2'

export default {
  name: 'ListTable',

  components: {
    BasePagination,
    RowsPerPage,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DatePicker.name]: DatePicker
  },

  mixins: [
    FormUpdaterMixin
  ],

  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Object,
      default: () => {
        return {
          rowsPerPage: 10,
          page: 1,
          sort: null,
          filter: {
            custom_search: ''
          }
        }
      }
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          perPageOptions: [5, 10, 25, 50],
          total: 0
        }
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchFields: {
      type: Array,
      default: () => {
        return []
      }
    },
    listFilters: {
      type: Array,
      default: () => {
        return []
      }
    },
    listFiltersProp: {
      type: String,
      default: ''
    },
    listFiltersLabel: {
      type: String,
      default: ''
    },
    nameProp: {
      type: String,
      default: ''
    },
    clonable: {
      type: Boolean,
      default: false
    },
    creable: {
      type: Boolean,
      default: true
    },
    deletable: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    showable: {
      type: Boolean,
      default: true
    },
    hasChildren: {
      type: Boolean,
      default: false
    },
    excludeFromDelete: {
      type: Array,
      default: () => {
        return []
      }
    },
    hideDefaultSearch: {
      type: Boolean,
      default: false
    },
    hasActions: {
      type: Boolean,
      default: true
    },
    actionsLabel: {
      type: String,
      default: ''
    },
    actionsMinWidth: {
      type: Number,
      default: 70
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selectedRowValue: {
      type: [String, Number, Object],
      default: null
    },
    selectedRowProp: {
      type: String,
      default: 'id'
    },
    newButtonLabel: {
      type: String,
      default: 'Nuovo'
    }
  },

  computed: {
    ...mapGetters({
      darkMode: 'settings/darkMode'
    })
  },

  watch: {
    'value.rowsPerPage' (oldVal, newVal) {
      if (oldVal !== newVal) {
        this.updateValue('page', 1)
      }
    }
  },

  methods: {
    handleSort (sortData) {
      if (sortData.column.sortable) {
        switch (sortData.order) {
          case 'ascending':
            this.updateValue('sort', sortData.prop)
            break
          case 'descending':
            this.updateValue('sort', `-${sortData.prop}`)
            break
          default:
            this.updateValue('sort', null)
            break
        }
      }
    },
    tableRowClassName({ row }) {
      if (this.selectable && this.selectedRowValue &&
        row[this.selectedRowProp] == this.selectedRowValue[this.selectedRowProp]) {
        return 'selected'
      }
    },
    handleClone (row) {
      swal.fire({
        title: 'Sei sicuro?',
        text: this.nameProp ? `Sicuro di voler clonare "${row[this.nameProp]}"?` : 'Sicuro di voler clonare l\'elemento?',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success btn-fill',
          cancelButton: 'btn btn-danger btn-fill'
        },
        confirmButtonText: 'Si, clona',
        cancelButtonText: 'No, annulla',
        buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.$emit('onClone', row)
        }
      })
    },
    handleDelete (row) {
      swal.fire({
        title: 'Sei sicuro?',
        text: this.nameProp ? `L'eliminazione di "${row[this.nameProp]}" sarà irreversibile.` : 'L\'eliminazione dell\'elemento sarà irreversibile.',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success btn-fill',
          cancelButton: 'btn btn-danger btn-fill'
        },
        confirmButtonText: 'Si, cancella',
        cancelButtonText: 'No, annulla',
        buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.$emit('onDelete', row)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

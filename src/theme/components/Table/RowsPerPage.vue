<template>
  <div>
    <label class="rows-per-page-label">
      Rows per page:
    </label>
    <el-select
      class="select-primary rows-per-page-select"
      size="mini"
      placeholder="Single Select"
      :value="value.rowsPerPage"
      @change="updateSelect"
    >
      <el-option
        v-for="option in options"
        :key="option"
        class="select-primary"
        :value="option"
        :label="option"
      />
    </el-select>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'

export default {
  name: 'RowsPerPage',

  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      default: () => {
        return [5, 10, 25, 50]
      }
    }
  },
  methods: {
    updateSelect (evt) {
      this.$emit('inputRowsPerPage', evt)
      this.$emit('inputPage', 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

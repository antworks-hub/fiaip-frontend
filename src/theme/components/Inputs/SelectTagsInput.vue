<template>
  <div>
    <base-select
      v-model="tags"
      multiple
      size="large"
      label="Tags"
      :items="items"
      :loading="isLoading"
      item-value="id"
      item-name="name"
      autocomplete="name"
      placeholder="Tags"
      filterable
      allow-create
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Select, Option } from 'element-ui'

export default {
  name: 'SelectTagsInput',
  components: {
    [Option.name]: Option,
    [Select.name]: Select
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      tags: [],
      isLoading: false
    }
  },
  watch: {
    tags: {
      handler () {
        const newValue = this.tags.find(el => typeof (el) === 'string')
        if (newValue) {
          const values = this.value.filter(el => typeof (el) !== 'string')
          this.isLoading = true
          this.createTag({ payload: { name: newValue } }).then((res) => {
            const createdValue = res.data.content.data
            values.push(createdValue.id)
            this.fetchTags().then((res) => {
              this.isLoading = false
              this.tags = values
              this.$emit('input', values)
            })
          })
        } else {
          this.$emit('input', this.tags)
        }
      }
    }
  },
  created () {
    this.tags = this.value
  },
  methods: {
    ...mapActions({
      fetchTags: 'tags/fetch',
      createTag: 'tags/create'
    })
  }
}
</script>

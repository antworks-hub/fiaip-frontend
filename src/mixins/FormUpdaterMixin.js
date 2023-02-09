import { cloneDeep, tap, set } from 'lodash'

export default {
  methods: {
    updateValue (key, value) {
      return new Promise((resolve, reject) => {
        this.$emit('clearErrors')
        this.$emit('input', tap(cloneDeep(this.value), v => set(v, key, value)))
        this.$nextTick(resolve)
      })
    },
    updateArrayValue (key, value) {
      this.$emit('clearErrors')
      const clonedValue = cloneDeep(this.value)
      if (clonedValue[key].includes(value)) {
        const index = clonedValue[key].indexOf(value)
        clonedValue[key].splice(index, 1)
      } else {
        clonedValue[key].push(value)
      }
      this.$emit('input', clonedValue)
    },
    updateSetting (index, key, value) {
      const clonedValue = [...this.value]
      clonedValue[index][key] = value
      this.$emit('input', clonedValue)
    }
  }
}

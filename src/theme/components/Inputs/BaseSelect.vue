<template>
  <div
    class="form-group select-form-group"
    :class="{
      'input-group-focus': focused,
      'has-label': label,
      'has-icon': hasIcon,
    }"
  >
    <slot name="label">
      <label v-if="label"> {{ label }} {{ required ? '*' : '' }} </label>
    </slot>
    <div class="mb-0" :class="{'input-group': hasIcon}">
      <slot name="addonLeft">
        <span v-if="addonLeftIcon" class="input-group-prepend">
          <div class="input-group-text"><i :class="addonLeftIcon" /></div>
        </span>
      </slot>
      <slot>
        <el-select
          aria-describedby="addon-right addon-left"
          :multiple="multiple"
          class="select-info"
          :size="size"
          v-bind="$attrs"
          :value="value"
          :autocomplete="autocomplete"
          auto-complete="off"
          :placeholder="placeholder"
          :filterable="filterable"
          :disabled="disabled"
          :clearable="clearable"
          :allow-create="allowCreate"
          v-on="listeners"
        >
          <div v-if="flat">
            <el-option 
              v-for="item in items" 
              :key="item" 
              class="select-info" 
              :value="item"
              :label="item" 
            />
          </div>
          <div v-else>
            <el-option
              v-for="item in items"
              :key="item[itemValue]"
              class="select-info"
              :value="item[itemValue]"
              :label="item[itemName]"
            />
          </div>
        </el-select>
      </slot>
      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-group-append">
          <div class="input-group-text"><i :class="addonRightIcon" /></div>
        </span>
      </slot>
    </div>

    <slot v-if="error || $slots.error" name="error">
      <label class="error">{{ error }}</label>
    </slot>
    <slot name="helperText" />
  </div>
</template>
<script>
import { Select, Option } from 'element-ui'

export default {
  name: 'BaseSelect',
  components: {
    [Option.name]: Option,
    [Select.name]: Select
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    required: Boolean,
    label: {
      type: String,
      description: 'Select label',
      default: ''
    },
    error: {
      type: String,
      description: 'Select error',
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    },
    allowCreate: {
      type: Boolean
    },
    flat: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array, Object, Boolean],
      description: 'Select value',
      default: ''
    },
    items: {
      type: Array,
      description: 'Select items',
      default: () => {
        return []
      }
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    itemName: {
      type: String,
      default: 'name'
    },
    addonRightIcon: {
      type: String,
      description: 'Select icon on the right',
      default: ''
    },
    addonLeftIcon: {
      type: String,
      description: 'Select icon on the left',
      default: ''
    }
  },
  data () {
    return {
      focused: false,
      touched: false
    }
  },
  computed: {
    hasIcon () {
      return this.hasLeftAddon || this.hasRightAddon
    },
    hasLeftAddon () {
      const { addonLeft } = this.$slots
      return (
        addonLeft !== undefined ||
        this.addonLeftIcon !== undefined
      )
    },
    hasRightAddon () {
      const { addonRight } = this.$slots
      return (
        addonRight !== undefined ||
        this.addonRightIcon !== undefined
      )
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      }
    }
  },
  methods: {
    onInput (evt) {
      const value = evt
      if (!this.touched) {
        this.touched = true
      }
      this.$emit('input', value)
    },
    onFocus (evt) {
      this.focused = true
      this.$emit('focus', evt)
    },
    onBlur (evt) {
      this.focused = false
      this.$emit('blur', evt)
    }
  }
}
</script>
<style></style>

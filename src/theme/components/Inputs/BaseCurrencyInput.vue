<template>
  <div
    class="form-group"
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
        <input
          ref="currency"
          v-model="displayValue"
          v-currency="currency"
          v-bind="$attrs"
          class="form-control"
          aria-describedby="addon-right addon-left"
          v-on="listeners"
        >
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
export default {
  name: 'BaseCurrencyInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    required: Boolean,
    label: {
      type: String,
      description: 'Input label',
      default: ''
    },
    error: {
      type: String,
      description: 'Input error',
      default: ''
    },
    value: {
      type: [String, Number],
      description: 'Input value',
      default: ''
    },
    addonRightIcon: {
      type: String,
      description: 'Input icon on the right',
      default: null
    },
    addonLeftIcon: {
      type: String,
      description: 'Input icon on the left',
      default: null
    },
    currency: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      focused: false,
      touched: false
    }
  },
  computed: {
    displayValue: {
      get () {
        if (this.focused) {
          return this.value
        } else {
          return this.value ? this.value.toString() + ' €' : null
        }
      },
      set (modifiedValue) {
        this.$emit('input', modifiedValue)
      }
    },
    hasIcon () {
      return this.hasLeftAddon || this.hasRightAddon
    },
    hasLeftAddon () {
      const { addonLeft } = this.$slots
      return (
        addonLeft !== undefined ||
        (this.addonLeftIcon !== undefined && this.addonLeftIcon !== null)
      )
    },
    hasRightAddon () {
      const { addonRight } = this.$slots
      return (
        addonRight !== undefined ||
        (this.addonRightIcon !== undefined && this.addonRightIcon !== null)
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
      if (!this.touched) {
        this.touched = true
      }
      this.$emit('input', evt.target.value)
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

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
      <el-tooltip
        v-if="tooltipText"
        effect="light"
        :open-delay="300"
        placement="bottom"
      >
        <mdicon :width="13" :height="13" name="information" class="mr-1" />
        <div slot="content" v-html="tooltipText" />
      </el-tooltip>

      <label v-if="label"> {{ label }} {{ required ? '*' : '' }} {{ doubleRequired ? '**' : '' }} </label>
    </slot>
    <div class="mb-0" :class="{'input-group': hasIcon}">
      <slot name="addonLeft">
        <span v-if="addonLeftIcon" class="input-group-prepend">
          <div class="input-group-text">
            <mdicon v-if="addonLeftIconType == 'mdi'" :width="13" :height="13" :name="addonLeftIcon" />
            <i v-else :class="addonLeftIcon" />
          </div>
        </span>
      </slot>
      <slot>
        <input
          :value="value"
          v-bind="$attrs"
          class="form-control"
          aria-describedby="addon-right addon-left"
          v-on="listeners"
          :maxlength="maxlength"
        >
      </slot>
      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-group-append">
          <div class="input-group-text">
            <mdicon v-if="addonRightIconType == 'mdi'" :width="13" :height="13" :name="addonRightIcon" />
            <i v-else :class="addonRightIcon" />
          </div>
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
  name: 'BaseInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    required: Boolean,
    doubleRequired: Boolean,
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
    addonRightIconType: {
      type: String,
      default: null
    },
    addonLeftIcon: {
      type: String,
      description: 'Input icon on the left',
      default: null
    },
    addonLeftIconType: {
      type: String,
      default: null
    },
    isNumericInteger: {
      type: Boolean,
      default: false
    },
    isNumericFloat: {
      type: Boolean,
      default: false
    },
    tooltipText: {
      type: String,
      default: null
    },
    maxlength: {
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
        (this.addonLeftIcon && this.addonLeftIcon !== undefined)
      )
    },
    hasRightAddon () {
      const { addonRight } = this.$slots
      return (
        addonRight !== undefined ||
        (this.addonRightIcon && this.addonRightIcon !== undefined)
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
      const value = evt.target.value
      if (!this.touched) {
        this.touched = true
      }
      // if (this.isNumericInteger) {
      //   value = value.replace(/\D/g, '')
      // }
      // if (this.isNumericFloat) {
      //   value = value.replace(/^d+.dd$/g, '')
      // }
      // evt.target.value = value
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

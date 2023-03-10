<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    class="btn"
    :class="[
      { 'btn-round': round },
      { 'btn-block': block },
      { 'btn-wd': wide },
      { 'btn-icon btn-fab': icon },
      { [`btn-${type}`]: type },
      { [`btn-${size}`]: size },
      { 'btn-simple': simple },
      { 'btn-link': link },
      { disabled: disabled && tag !== 'button' }
    ]"
    @click="handleClick"
  >
    <slot v-if="loading" name="loading">
      <mdicon name="loading" class="spinner" size="20"></mdicon>
    </slot>
    <slot v-if="!loading" />
  </component>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      default: 'button',
      description: 'Button html tag'
    },
    round: Boolean,
    icon: Boolean,
    block: Boolean,
    loading: Boolean,
    wide: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'default',
      description: 'Button type (primary|secondary|danger etc)'
    },
    nativeType: {
      type: String,
      default: 'button',
      description: 'Button native type (e.g button, input etc)'
    },
    size: {
      type: String,
      default: '',
      description: 'Button size (sm|lg)'
    },
    simple: {
      type: Boolean,
      description: 'Whether button is simple (outlined)'
    },
    link: {
      type: Boolean,
      description: 'Whether button is a link (no borders or background)'
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &i {
    padding: 0 3px;
  }
}
</style>

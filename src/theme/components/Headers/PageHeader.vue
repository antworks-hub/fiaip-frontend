<template>
  <div class="row">
    <div v-if="showBack || showTitle" class="col-6 mb-3 mt-3 d-flex justify-content-start align-items-center">
      <i v-if="showBack" class="tim-icons icon-minimal-left clickable" aria-hidden="true" @click="$emit('backClick')" />
      <span v-if="showTitle" class="text-uppercase ml-4">{{ title }}</span>
    </div>
    <div class="col-6 mb-5 mt-3 d-flex justify-content-end align-items-center">
      <slot />
      <base-button
        v-if="downloadUrl"
      >
        EXPORT {{ title }}
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',

  props: {
    showTitle: {
      type: [Boolean, Object],
      default: true
    },
    showBack: {
      type: [Boolean, Object],
      default: true
    },
    title: {
      type: String,
      default: null
    },
    downloadUrl: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

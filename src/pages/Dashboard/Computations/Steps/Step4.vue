<template>

  <ViewLocationRates v-if="locationRates !== undefined" :locationRates="locationRates" />

</template>

<script>

import ViewLocationRates from "../Components/ViewLocationRates.vue";

export default {
  components: {
    ViewLocationRates
  },
  props: {
    computation: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  computed: {
    locationRates() {
      return this.$store.state.computations.singlePayload
    }
  }
}
</script>

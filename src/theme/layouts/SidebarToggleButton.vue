<template>
  <el-tooltip
    :content="isMinimized ? 'Apri Sidebar' : 'Chiudi Sidebar'"
    effect="light"
    :open-delay="300"
    placement="right"
  >
    <button
      class="minimize-sidebar btn btn-link btn-just-icon"
      rel="tooltip"
      data-original-title="Sidebar toggle"
      data-placement="right"
      @click="minimizeSidebar"
    >
      <i class="tim-icons icon-align-center visible-on-sidebar-regular" />
      <i class="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
    </button>
  </el-tooltip>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SidebarToggleButton',
  computed: {
    ...mapGetters({
      isMinimized: 'settings/sidebarMinimized'
    })
  },
  methods: {
    ...mapActions({
      minimizeSidebar: 'settings/toggleSidebarMinimized'
    })
  }
}
</script>
<style></style>

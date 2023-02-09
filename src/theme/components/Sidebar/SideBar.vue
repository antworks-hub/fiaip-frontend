<template>
  <div class="sidebar" :data="backgroundColor">
    <div ref="sidebarScrollArea" class="sidebar-wrapper">
      <div class="logo">
        <a href="https://vitevini.com" class="simple-text logo-full">
          <img :src="logo" alt="app-logo">
        </a>
      </div>
      <slot />
      <ul class="nav">
        <slot name="links">
          <sidebar-item
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          >
            <sidebar-item
              v-for="(subLink, sublinkIndex) in link.children"
              :key="subLink.name + sublinkIndex"
              :link="subLink"
            />
          </sidebar-item>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  props: {
    title: {
      type: String,
      default: 'Tenders Database',
      description: 'Sidebar title'
    },
    shortTitle: {
      type: String,
      default: 'AS',
      description: 'Sidebar short title'
    },
    logo: {
      type: String,
      default: '/img/site/ExactSciences-logo.png',
      description: 'Sidebar app logo'
    },
    backgroundColor: {
      type: String,
      default: 'secondary',
      validator: (value) => {
        const acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'orange',
          'red',
          'primary',
          'secondary'
        ]
        return acceptedValues.includes(value)
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary|secondary)'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  computed: {
    ...mapGetters({
      sidebarMinimized: 'settings/sidebarMinimized'
    })
  },
  watch: {
    sidebarMinimized: {
      handler () {
        this.minimizeSidebar()
      },
      immediate: true
    }
  },
  beforeDestroy () {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  },
  methods: {
    minimizeSidebar () {
      if (this.$sidebar) {
        this.$sidebar.setMinimize(this.sidebarMinimized)
      }
    }
  }
}
</script>
<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>

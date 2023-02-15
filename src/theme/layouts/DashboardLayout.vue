<template>
  <div v-if="!isLoading" class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar, 'no-scroll': lockScreen }">
    <LockScreen v-if="lockScreen" />
    <notifications />
    <sidebar-fixed-toggle-button />
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot="links">
        <div>
          <sidebar-item
            :link="{
              name: $t('sidebar.dashboard'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/riepilogo'
            }"
          />

          <sidebar-item
              :link="{
              name: $t('sidebar.calculate'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/calcoli'
            }"
          />

          <sidebar-item
              :link="{
              name: $t('sidebar.attachments'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/allegati'
            }"
          />

          <sidebar-item
              :link="{
              name: $t('sidebar.errors'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/errori'
            }"
          />

        </div>
        <div class="logo"></div>
        <div v-if="$isAdmin()">
          <sidebar-item
            :link="{
              name: $t('sidebar.users'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/utenti'
            }"
          />

          <sidebar-item
            :link="{
              name: $t('sidebar.tables'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/tabelle'
            }"
          />

          <sidebar-item
              :link="{
              name: $t('sidebar.manage-errors'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/gestione-errori'
            }"
          />

          <sidebar-item
              :link="{
              name: $t('sidebar.manage-attachments'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/gestione-allegati'
            }"
          />

          <sidebar-item
              :link="{
              name: $t('sidebar.users-log'),
              iconFamily: 'mdi',
              icon: 'note-text',
              path: '/log-utenti'
            }"
          />

        </div>
      </template>
    </side-bar>

    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar />
      <router-view name="header" />

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view />
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import { ZoomCenterTransition } from 'vue2-transitions'
import { mapGetters, mapActions } from 'vuex'
import SidebarItem from '../components/Sidebar/SidebarItem.vue'
import LockScreen from './LockScreen.vue'
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import SidebarFixedToggleButton from './SidebarFixedToggleButton.vue'

function hasElement (className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar (className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    SidebarFixedToggleButton,
    ZoomCenterTransition,
    SidebarItem,
    LockScreen
  },

  data () {
    return {
      isLoading: true,
      sidebarBackground: 'secondary' // vue|blue|orange|green|red|primary|secondary
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      darkMode: 'settings/darkMode',
      lockScreen: 'settings/lockScreen'
    })
  },
  watch: {
    user: {
      handler (val) {
        if (!val) {
          this.$router.go()
        }
      }
    },
    darkMode: {
      handler () {
        this.setDarkMode()
      },
      immediate: true
    }
  },
  created () {
    this.reloadUser()
      .then((res) => {
        this.isLoading = false
      })
      .catch(() => {
        this.$router.go()
        this.isLoading = false
      })
  },
  mounted () {
    this.initScrollbar()
  },
  methods: {
    ...mapActions({
      reloadUser: 'auth/reload'
    }),
    setDarkMode () {
      const docClasses = document.body.classList
      if (this.darkMode) {
        docClasses.remove('white-content')
      } else {
        docClasses.add('white-content')
      }
    },
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    initScrollbar () {
      const docClasses = document.body.classList
      const isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar')
        initScrollbar('main-panel')
        initScrollbar('sidebar-wrapper')

        docClasses.add('perfect-scrollbar-off')
      } else {
        docClasses.add('perfect-scrollbar-off')
      }
    }
  }
}
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>

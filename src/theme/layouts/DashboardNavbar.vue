<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div class="navbar-minimize d-inline">
        <sidebar-toggle-button />
      </div>
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1" />
          <span class="navbar-toggler-bar bar2" />
          <span class="navbar-toggler-bar bar3" />
        </button>
      </div>
      <!-- <a class="navbar-brand">{{ routeName }}</a> -->
      <a class="navbar-brand">FIAIP</a>
    </div>

    <ul class="navbar-nav ml-auto">
      <!-- <li class="nav-item">
        <a class="nav-link" style="cursor:pointer;" @click="toggleDarkMode">
          <mdicon :name="darkMode ? 'white-balance-sunny' : 'moon-waxing-crescent'" />
        </a>
        <mdicon v-if="darkMode" name="white-balance-sunny" />
      </li> -->
      <base-dropdown
        tag="li"

        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template
          slot="title"
        >
          <div class="navbar-name">
            {{ `${user.first_name} ${user.last_name}` }}
            <!-- <mdicon name="account" /> -->
            <!-- <img src="img/mike.jpg" /> -->
          </div>
          <b class="caret d-none d-lg-block d-xl-block" />
          <p class="d-lg-none">
            Log out
          </p>
        </template>
        <li class="nav-link">
          <router-link :to="{ name: 'Profilo' }" class="nav-item dropdown-item">
            Profilo
          </router-link>
        </li>
        <div class="dropdown-divider" />
        <li class="nav-link">
          <span class="nav-item dropdown-item" @click="doLogout">Log out</span>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SidebarToggleButton from './SidebarToggleButton'
import { BaseNav } from '@/theme/components'

export default {
  components: {
    SidebarToggleButton,
    BaseNav
  },
  data () {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      darkMode: 'settings/darkMode',
      user: 'auth/user'
    }),
    routeName () {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      toggleDarkMode: 'settings/toggleDarkMode'
    }),
    doLogout () {
      this.logout().then((res) => {
        this.$router.push('/login')
      })
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown () {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown () {
      this.activeNotifications = false
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    }
  }
}
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>

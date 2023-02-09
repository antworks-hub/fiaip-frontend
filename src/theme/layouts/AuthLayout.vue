<template>
  <div>
    <notifications />
    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-end"
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <a v-if="title" class="navbar-brand" href="#">{{ title }}</a>
      </div>

      <!-- <ul class="navbar-nav">
        <div class="nav-item" tag="li">
          <a class="nav-link text-primary" href="https://vitevini.com">
            <i class="tim-icons icon-minimal-left" /> Vai al sito
          </a>
        </div>
      </ul> -->
    </base-nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content">
          <zoom-center-transition
            :duration="pageTransitionDuration"
            mode="out-in"
          >
            <router-view />
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <nav>
              <!-- <ul class="nav">
                <li class="nav-item">
                  <a
                    href="https://www.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    Creative Tim
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="http://presentation.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    About Us
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    href="http://blog.creative-tim.com"
                    target="_blank"
                    rel="noopener"
                    class="nav-link"
                  >
                    Blog
                  </a>
                </li>
              </ul> -->
            </nav>
            <div class="copyright">
              <!-- &copy; {{ year }}, made with
              <i class="tim-icons icon-heart-2"></i> by
              <a href="https://binarcode.com" target="_blank">BinarCode</a> and
              <a
                href="https://www.creative-tim.com/?ref=pdf-vuejs"
                target="_blank"
                rel="noopener"
                >Creative Tim</a
              >
              for a better web. -->
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseNav } from 'src/theme/components'
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    BaseNav,
    ZoomCenterTransition
  },
  beforeRouteUpdate (to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu()
      setTimeout(() => {
        next()
      }, this.menuTransitionDuration)
    } else {
      next()
    }
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'auth-page'
    }
  },
  computed: {
    title () {
      return `${this.$route.name}`
    }
  },
  watch: {
    $route () {
      this.setPageClass()
    }
  },
  created () {
    this.whiteMode()
  },
  beforeDestroy () {
    this.closeMenu()
  },
  mounted () {
    this.setPageClass()
  },
  methods: {
    toggleNavbar () {
      document.body.classList.toggle('nav-open')
      this.showMenu = !this.showMenu
    },
    closeMenu () {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    },
    setPageClass () {
      this.pageClass = 'login-page'.toLowerCase()
    },
    whiteMode () {
      const docClasses = document.body.classList
      docClasses.add('white-content')
    }
  }
}
</script>
<style lang="scss">
.navbar.auth-navbar {
  top: 0;
}

$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>

import Sidebar from '@/theme/components/Sidebar/SideBar.vue'
import SidebarItem from '@/theme/components/Sidebar/SidebarItem.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  displaySidebar (value) {
    this.showSidebar = value
  },
  toggleMinimize () {
    document.body.classList.toggle('sidebar-mini')
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event('resize'))
    }, 180)

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize)
    }, 1000)

    this.isMinimized = !this.isMinimized
  },
  setMinimize (status) {
    if (status) {
      document.body.classList.add('sidebar-mini')
    } else {
      document.body.classList.remove('sidebar-mini')
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event('resize'))
    }, 180)

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(() => {
      clearInterval(simulateWindowResize)
    }, 1000)

    this.isMinimized = status
  }
}

const SidebarPlugin = {
  install (Vue, options) {
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks
    }
    const app = new Vue({
      data: {
        sidebarStore: SidebarStore
      }
    })
    Vue.prototype.$sidebar = app.sidebarStore
    Vue.component('SideBar', Sidebar)
    Vue.component('SidebarItem', SidebarItem)
  }
}

export default SidebarPlugin

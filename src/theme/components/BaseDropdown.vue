<template>
  <div>
    <slot v-if="externalButton" name="title-container" :is-open="isOpen">
      <component
        :is="titleTag"
        class="dropdown-toggle no-caret"
        :class="titleClasses"
        :aria-label="title || 'dropdown'"
        :aria-expanded="isOpen"
        data-toggle="dropdown"
        @click.stop="toggleDropDown"
      >
        <slot name="title" :is-open="isOpen">
          <i :class="icon" /> {{ title }}
        </slot>
      </component>
    </slot>
    <component
      :is="tag"
      v-click-outside="closeDropDown"
      class="dropdown"
      :class="[{ show: isOpen }, `drop${direction}`, {'position-absolute': externalButton}]"
      @click="toggleDropDown"
    >
      <slot v-if="!externalButton" name="title-container" :is-open="isOpen">
        <component
          :is="titleTag"
          class="dropdown-toggle no-caret"
          :class="titleClasses"
          :aria-label="title || 'dropdown'"
          :aria-expanded="isOpen"
          data-toggle="dropdown"
        >
          <slot name="title" :is-open="isOpen">
            <i :class="icon" /> {{ title }}
          </slot>
        </component>
      </slot>
      <ul
        class="dropdown-menu"
        :class="[
          { show: isOpen },
          { 'dropdown-menu-right': menuOnRight },
          menuClasses
        ]"
      >
        <slot />
      </ul>
    </component>
  </div>
</template>
<script>
export default {
  name: 'BaseDropdown',
  props: {
    tag: {
      type: String,
      default: 'div',
      description: 'Dropdown html tag (e.g div, ul etc)'
    },
    titleTag: {
      type: String,
      default: 'button',
      description: 'Dropdown title (toggle) html tag'
    },
    title: {
      type: String,
      description: 'Dropdown title',
      default: ''
    },
    direction: {
      type: String,
      default: 'down', // up | down
      description: 'Dropdown menu direction (up|down)'
    },
    icon: {
      type: String,
      description: 'Dropdown icon',
      default: ''
    },
    titleClasses: {
      type: [String, Object, Array],
      description: 'Title css classes',
      default: ''
    },
    menuClasses: {
      type: [String, Object],
      description: 'Menu css classes',
      default: ''
    },
    menuOnRight: {
      type: Boolean,
      description: 'Whether menu should appear on the right'
    },
    externalButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropDown () {
      this.isOpen = !this.isOpen
      this.$emit('change', this.isOpen)
    },
    closeDropDown () {
      this.isOpen = false
      this.$emit('change', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  user-select: none;
}
</style>

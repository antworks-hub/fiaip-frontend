<template>
  <bread-crumb>
    <BreadCrumbItem
      v-for="(route, index) in $route.matched.slice()"
      :key="route.name"
      style="display:inline-block"
    >
      <router-link
        v-if="index < $route.matched.length - 1"
        :to="{ name: route.name }"
        class="breadcrumb-link"
      >
        {{ route.name }}
      </router-link>
      <span v-else class="breadcrumb-current">{{ route.name }}</span>
    </BreadCrumbItem>
  </bread-crumb>
</template>

<script>
import BreadCrumb from './Breadcrumb'
import BreadCrumbItem from './BreadcrumbItem'

export default {
  name: 'RouteBreadcrumb',
  components: {
    BreadCrumb,
    BreadCrumbItem
  },
  methods: {
    getBreadName (route) {
      return route.name
    }
  }
}
</script>

<style scoped></style>

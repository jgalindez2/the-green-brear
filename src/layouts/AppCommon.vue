<template>
  <div class="main">
    <app-nav-menu :categories="categories"/>
    <transition-group name="fade" mode="out-in" appear>
      <the-header key="app-header"/>
      <router-view key="router-view"/>
    </transition-group>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import AppNavMenu from '@/components/AppNavMenu'
import data from '@/catalog/data'
export default {
  components: {
    TheHeader,
    AppNavMenu
  },

  computed: {
    categories () {
      return Object.values(data.categories)
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="main">
    <app-nav-menu :categories="categories"/>
    <transition-group name="fade" mode="out-in" appear>
      <app-header key="app-header"/>
      <router-view key="router-view"/>
    </transition-group>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppNavMenu from '@/components/AppNavMenu'
import data from '@/catalog/data'
export default {
  components: {
    AppHeader,
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

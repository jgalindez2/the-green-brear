<template>
  <div class="main">
    <app-nav-menu/>
    <app-header/>
    <transition name="fade" mode="out-in" appear>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppNavMenu from '@/components/AppNavMenu'
export default {
  components: {
    AppHeader,
    AppNavMenu
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

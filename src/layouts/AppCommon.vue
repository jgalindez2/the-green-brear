<template>
  <div class="main">
    <template v-show="showPage">
      <app-nav-menu/>
      <transition-group name="fade" mode="out-in" appear>
        <the-header key="app-header"/>
        <router-view key="router-view" @ready="setReadyPage"/>
      </transition-group>
    </template>
    <div v-show="!showPage">
      <AppSpinner/>
      <p>Loading ...</p>
    </div>
  </div>
</template>

<script>
import AppSpinner from '@/components/AppSpinner'
import TheHeader from '@/components/TheHeader'
import AppNavMenu from '@/components/AppNavMenu'
export default {
  components: {
    TheHeader,
    AppSpinner,
    AppNavMenu
  },
  data () {
    return {
      showPage: false
    }
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      this.$Progress.start()
      next()
    })
  },
  methods: {
    setReadyPage () {
      this.showPage = true
      this.$Progress.finish()
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

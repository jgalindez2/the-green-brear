<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate () {
    const userId = this.$store.state.userId
    this.$store.dispatch('fetchUser', userId)
  }
}
</script>

<style lang="scss" src="@/assets/styles/style.scss"></style>

<template src="./template.html"></template>

<script>
export default {
  created () {
    this.$emit('ready')
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

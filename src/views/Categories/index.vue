<template src="./template.html"></template>

<script>
import data from '@/catalog/data'
import CategoryList from '@/components/CategoryList'
export default {
  components: {
    CategoryList
  },
  computed: {
    categories () {
      return Object.values(data.categories)
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

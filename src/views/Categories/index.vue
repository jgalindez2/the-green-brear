<template src="./template.html"></template>

<script>
import { mapState } from 'vuex'
import CategoryList from '@/components/CategoryList'
export default {
  components: {
    CategoryList
  },
  computed: {
    ...mapState({
      categories: state => Object.values(state.sourceData.categories)
    })
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
import CategoryList from '@/components/CategoryList'
export default {
  components: {
    CategoryList
  },
  computed: {
    ...mapState({
      categories: state => Object.values(state.categories)
    })
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

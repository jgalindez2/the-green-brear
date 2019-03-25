<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import CategoryList from '@/components/CategoryList'
export default {
  components: {
    CategoryList
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapState({
      categories: state => Object.values(state.categories)
    })
  },
  async created () {
    await this.fetchCategories()
    await this.fetchTopics()
    await this.fetchUsers()
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  methods: {
    ...mapActions([
      'fetchCategories',
      'fetchTopics',
      'fetchUsers'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

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
      categories: state => Object.values(state.categories.items)
    })
  },
  async created () {
    await this['categories/fetchCategories']()
    await this['topics/fetchTopics']()
    await this['users/fetchUsers']()
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  methods: {
    ...mapActions([
      'categories/fetchCategories',
      'topics/fetchTopics',
      'users/fetchUsers'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import TopicsList from '@/components/TopicsList'
export default {
  components: {
    TopicsList
  },
  mixins: [asyncDataStatus],
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      category: null
    }
  },
  computed: {
    categoryTopics () {
      return Object.values(this.topics)
    },
    ...mapState([
      'categories',
      'topics'
    ])
  },
  async created () {
    const category = await this.fetchCategory(this.slug)
    const categoryKey = Object.keys(category)[0]
    await this.fetchCategoryTopics(categoryKey)
    await this.fetchPosts()
    await this.fetchUsers()
    this.category = this.categories[categoryKey]
    this.asyncDataStatus_fetched()
  },
  methods: {
    ...mapActions([
      'fetchCategoryTopics',
      'fetchCategory',
      'fetchTopics',
      'fetchUsers',
      'fetchPosts'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

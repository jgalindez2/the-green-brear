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
    ...mapState({
      categories: state => state.categories.items,
      topics: state => state.topics.items
    })
  },
  async created () {
    const category = await this['categories/fetchCategory'](this.slug)
    const categoryKey = Object.keys(category)[0]
    await this['categories/fetchCategoryTopics'](categoryKey)
    await this['posts/fetchPosts']()
    await this['users/fetchUsers']()
    this.category = this.categories[categoryKey]
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  methods: {
    ...mapActions([
      'categories/fetchCategoryTopics',
      'categories/fetchCategory',
      'topics/fetchTopics',
      'users/fetchUsers',
      'posts/fetchPosts'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

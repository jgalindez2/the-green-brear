<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import TopicsList from '@/components/TopicsList'
import TopicNavbar from '@/components/TopicNavbar'
export default {
  components: {
    TopicsList,
    TopicNavbar
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapState({
      topics: state => Object.values(state.topics.items),
      mostViewsTopics: state => Object.values(state.topics.items)
        .sort((a, b) => b.views - a.views)
        .slice(0, 3),
      recentTopics: state => Object.values(state.topics.items)
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 3)
    })
  },
  async created () {
    await this['topics/fetchTopics']()
    await this['users/fetchUsers']()
    await this['posts/fetchPosts']()
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  methods: {
    ...mapActions([
      'posts/fetchPosts',
      'topics/fetchTopics',
      'users/fetchUsers'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

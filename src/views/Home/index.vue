<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
import TopicsList from '@/components/TopicsList'
import TopicNavbar from '@/components/TopicNavbar'
export default {
  components: {
    TopicsList,
    TopicNavbar
  },
  computed: {
    ...mapState({
      topics: state => Object.values(state.topics),
      mostViewsTopics: state => Object.values(state.topics)
        .sort((a, b) => b.views - a.views)
        .slice(0, 3),
      recentTopics: state => Object.values(state.topics)
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 3)
    })
  },
  async created () {
    await this.fetchTopics()
    await this.fetchUsers()
    await this.fetchPosts()
  },
  methods: {
    ...mapActions([
      'fetchTopics',
      'fetchUsers',
      'fetchPosts'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

<template src="./template.html"></template>

<script>
import data from '@/catalog/data.json'
import TopicsList from '@/components/TopicsList'
import TopicNavbar from '@/components/TopicNavbar'
export default {
  components: {
    TopicsList,
    TopicNavbar
  },
  data () {
    return {}
  },
  computed: {
    topics () {
      return Object.values(data.topics)
    },
    mostViewsTopics () {
      return Object.values(data.topics).sort((a, b) => b.views - a.views).slice(0, 3)
    },
    recentTopics () {
      return Object.values(data.topics).sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 3)
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

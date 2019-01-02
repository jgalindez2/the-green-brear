<template src="./template.html"></template>

<script>
import data from '@/catalog/data'
import TopicsList from '@/components/TopicsList'
export default {
  components: {
    TopicsList
  },

  props: {
    slug: {
      required: true,
      type: String
    }
  },

  computed: {
    category () {
      return Object.values(data.categories).find(category => category.slug === this.slug)
    },
    topics () {
      return Object.values(data.topics).filter(topic => topic.categoryId === this.category['.key'])
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

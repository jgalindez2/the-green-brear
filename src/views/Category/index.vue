<template src="./template.html"></template>

<script>
import { mapState } from 'vuex'
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
    ...mapState({
      sourceData: state => state.sourceData
    }),
    category () {
      return Object.values(this.sourceData.categories)
        .find(category => category.slug === this.slug)
    },
    topics () {
      return Object.values(this.sourceData.topics)
        .filter(topic => topic.categoryId === this.category['.key'])
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

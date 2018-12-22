<template src="./template.html"></template>

<script>
import data from '@/catalog/data'
import PostsList from '@/components/PostsList'
export default {
  components: {
    PostsList
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {}
  },

  computed: {
    topic () {
      return data.topics[this.id]
    },
    categoryName () {
      return data.categories[this.topic.categoryId].name
    },
    posts () {
      const postIds = Object.values(this.topic.posts)
      return Object.values(data.posts).filter(post => postIds.includes(post['.key']))
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

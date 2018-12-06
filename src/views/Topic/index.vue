<template src="./template.html"></template>

<script>
import data from '@/catalog/data'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      users: data.users
    }
  },
  computed: {
    topic () {
      return data.topics[this.id]
    },
    firstPost () {
      return data.posts[this.topic.firstPostId]
    },
    categoryName () {
      return data.categories[this.topic.categoryId].name
    },
    user () {
      return data.users[this.topic.userId]
    },
    posts () {
      let arr = Object.values(data.posts).filter(post => post.topicId === this.id)
      arr.shift()
      return arr
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

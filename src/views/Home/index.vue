<template src="./template.html"></template>

<script>
import data from '@/catalog/data.json'
export default {
  data () {
    return {
      categories: data.categories,
      posts: data.posts,
      topics: data.topics,
      users: data.users
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

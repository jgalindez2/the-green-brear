<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
import PostsList from '@/components/PostsList'
import PostForm from '@/components/PostForm'
export default {
  components: {
    PostsList,
    PostForm
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      topicPosts: null
    }
  },

  computed: {
    firstDataLoaded () {
      return this.categories && this.topic && this.topicPosts
    },
    categoryName () {
      return this.categories[this.topic.categoryId].name
    },
    ...mapState([
      'categories',
      'topic'
    ])
  },

  async created () {
    await this.fetchTopic(this.id)
    await this.fetchCategories()
    this.topicPosts = await this.fetchTopicPosts(this.id)
  },

  methods: {
    saveNewPost (text) {
      const post = {
        text,
        topicId: this.id
      }
      this.savePost(post)
    },
    ...mapActions([
      'savePost',
      'fetchTopic',
      'fetchCategories',
      'fetchTopicPosts'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

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
      topicPosts: null,
      topic: null
    }
  },

  computed: {
    firstDataLoaded () {
      return this.categories && this.topic && this.topicPosts
    },
    category () {
      return this.categories[this.topic.categoryId]
    },
    ...mapState([
      'categories'
    ])
  },

  async created () {
    await this.fetchCategories()
    await this.fetchUsers()
    const posts = await this.fetchTopicPosts(this.id)
    this.topicPosts = Object.values(posts)
    this.topic = await this.fetchTopic(this.id)
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
      'fetchUsers',
      'fetchCategories',
      'fetchTopicPosts'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

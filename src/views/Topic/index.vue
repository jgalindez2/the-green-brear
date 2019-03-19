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
      topic: null
    }
  },

  computed: {
    firstDataLoaded () {
      return this.categories && this.topic && this.posts
    },
    category () {
      return this.categories[this.topic.categoryId]
    },
    topicPosts () {
      console.log('here updatgin')
      const postIds = Object.values(this.topic.posts)
      return Object.values(this.posts).filter(post => postIds.includes(post['.key']))
    },
    ...mapState([
      'categories',
      'posts'
    ])
  },

  async created () {
    await this.fetchCategories()
    await this.fetchUsers()
    await this.fetchTopicPosts(this.id)
    const topic = await this.fetchTopic(this.id)
    this.topic = topic[this.id]
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

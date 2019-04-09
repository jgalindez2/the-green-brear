<template src="./template.html"></template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import PostsList from '@/components/PostsList'
import PostForm from '@/components/PostForm'
export default {
  components: {
    PostsList,
    PostForm
  },
  mixins: [asyncDataStatus],
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
    category () {
      return this.categories[this.topic.categoryId]
    },
    topicPosts () {
      const postIds = Object.values(this.topic.posts)
      return Object.values(this.posts).filter(post => postIds.includes(post['.key']))
    },
    ...mapGetters({
      user: 'getUser'
    }),
    ...mapState([
      'categories',
      'posts',
      'topics'
    ])
  },
  async created () {
    await this.fetchCategories()
    await this.fetchUsers()
    await this.fetchTopicPosts(this.id)
    const topic = await this.fetchTopic(this.id)
    this.topic = topic[this.id]
    this.asyncDataStatus_fetched()
    this.$emit('ready')
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

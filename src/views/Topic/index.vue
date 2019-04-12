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
      user: 'auth/getUser'
    }),
    ...mapState({
      categories: state => state.categories.items,
      posts: state => state.posts.items,
      topics: state => state.topics.items
    })
  },
  async created () {
    await this['categories/fetchCategories']()
    await this['users/fetchUsers']()
    await this['posts/fetchTopicPosts'](this.id)
    const topic = await this['topics/fetchTopic'](this.id)
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
      this['posts/savePost'](post)
    },
    ...mapActions([
      'topics/fetchTopic',
      'users/fetchUsers',
      'posts/fetchTopicPosts',
      'posts/savePost',
      'categories/fetchCategories'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

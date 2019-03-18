<template src="./template.html"></template>

<script>
import { mapState, mapActions } from 'vuex'
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
  data () {
    return {
      category: null
    }
  },
  computed: {
    categoryTopics () {
      return this.category ? Object.values(this.topics)
        .filter(topic => topic.categoryId === this.category['.key']) : []
    },
    ...mapState([
      'categories',
      'topics'
    ])
  },
  async created () {
    await this.fetchTopics()
    await this.fetchUsers()
    await this.fetchPosts()
    const category = await this.fetchCategory(this.slug)
    const key = Object.keys(category)[0]
    const data = Object.values(category)[0]
    this.category = { ...data, '.key': key }
  },
  methods: {
    ...mapActions([
      'fetchCategory',
      'fetchTopics',
      'fetchUsers',
      'fetchPosts'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

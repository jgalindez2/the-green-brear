<template src="./template.html"></template>

<script>
import { mapActions, mapState } from 'vuex'
import TopicEditor from '@/components/TopicEditor'
export default {
  components: {
    TopicEditor
  },

  props: {
    topicId: {
      type: String,
      required: true
    }
  },

  computed: {
    topic () {
      return Object.values(this.topics).find(t => t['.key'] === this.topicId)
    },
    firstPost () {
      return this.posts[this.topic.firstPostId]
    },
    ...mapState([
      'topics',
      'posts'
    ])
  },

  async created () {
    await this.fetchTopic(this.topicId)
    this.fetchPost(this.topic.firstPostId)
  },

  methods: {
    async save ({ title, text }) {
      try {
        await this.updateTopic({ title, text, topicId: this.topicId })
        this.$router.push({ name: 'Topic', params: { id: this.topicId } })
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      this.$router.push({ name: 'Category', params: { slug: this.category.slug } })
    },
    ...mapActions([
      'updateTopic',
      'fetchPost',
      'fetchTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss">

</style>

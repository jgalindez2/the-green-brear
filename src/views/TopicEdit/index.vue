<template src="./template.html"></template>

<script>
import { mapActions, mapState } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
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
  mixins: [asyncDataStatus],
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
    await this.fetchPost(this.topic.firstPostId)
    this.asyncDataStatus_fetched()
    this.$emit('ready')
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

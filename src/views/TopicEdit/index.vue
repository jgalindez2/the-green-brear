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

  data () {
    return {}
  },

  computed: {
    topic () {
      return Object.values(this.sourceData.topics).find(t => t['.key'] === this.topicId)
    },
    firstPost () {
      return this.sourceData.posts[this.topic.firstPostId]
    },
    ...mapState ({
      sourceData: state => state.sourceData
    })
  },

  methods: {
    async save ({ title, text }) {
      const topicId = await this.updateTopic({
        title,
        text,
        topicId: this.topicId
      })
      this.$router.push({ name: 'Topic', params: {id: topicId} })
    },
    cancel () {
      this.$router.push({ name: 'Category', params: {slug: this.category.slug} })
    },
    ...mapActions([
      'updateTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss">

</style>

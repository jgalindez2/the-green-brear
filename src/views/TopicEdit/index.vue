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
  data () {
    return {
      edited: false
    }
  },
  computed: {
    topic () {
      return Object.values(this.topics).find(t => t['.key'] === this.topicId)
    },
    firstPost () {
      return this.posts[this.topic.firstPostId]
    },
    hasUnsaved () {
      return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.edited
    },
    ...mapState({
      topics: state => state.topics.items,
      posts: state => state.posts.items
    })
  },
  async created () {
    await this['topics/fetchTopic'](this.topicId)
    await this['posts/fetchPost'](this.topic.firstPostId)
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasUnsaved) {
      const confirm = window.confirm('Do you want to leave?')
      confirm ? next() : next(false)
    } else {
      next()
    }
  },
  methods: {
    async save ({ title, text }) {
      try {
        await this['topics/updateTopic']({ title, text, topicId: this.topicId })
        this.edited = true
        this.$router.push({ name: 'Topic', params: { id: this.topicId } })
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      this.$router.push({ name: 'Topic', params: { id: this.topic['.key'] } })
    },
    ...mapActions([
      'posts/fetchPost',
      'topics/updateTopic',
      'topics/fetchTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss">

</style>

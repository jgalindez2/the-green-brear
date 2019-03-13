<template src="./template.html"></template>

<script>
import { mapActions, mapState } from 'vuex'
import TopicEditor from '@/components/TopicEditor'
export default {
  components: {
    TopicEditor
  },

  props: {
    categoryId: {
      type: String,
      required: true
    }
  },

  data () {
    return {}
  },

  computed: {
    category () {
      return Object.values(this.sourceData.categories).find(c => c['.key'] === this.categoryId)
    },
    ...mapState({
      sourceData: state => state.sourceData
    })
  },

  methods: {
    async save ({ title, text }) {
      const topicId = await this.createTopic({
        title,
        text,
        categoryId: this.categoryId
      })
      this.$router.push({ name: 'Topic', params: { id: topicId } })
    },
    cancel () {
      this.$router.go(-1)
    },
    ...mapActions([
      'createTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss">

</style>

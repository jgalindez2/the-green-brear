<template src="./template.html"></template>

<script>
import { mapState } from 'vuex'
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
    return {}
  },

  computed: {
    ...mapState ({
      sourceData: state => state.sourceData
    }),
    topic () {
      return this.sourceData.topics[this.id]
    },
    categoryName () {
      return this.sourceData.categories[this.topic.categoryId].name
    },
    posts () {
      const postIds = Object.values(this.topic.posts)
      return Object.values(this.sourceData.posts)
        .filter(post => postIds.includes(post['.key']))
    }
  },

  methods: {
    savePost (text) {
      const post = {
        text,
        topicId: this.id
      }
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

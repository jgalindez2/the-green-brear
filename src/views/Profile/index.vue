<template src="./template.html"></template>

<script>
import { mapGetters, mapState } from 'vuex'
import { countObjectProperty } from '@/utils/'
import PostsList from '@/components/PostsList'
export default {
  components: {
    PostsList
  },

  filters: {
    capitalize (value) {
      return value.substring(0, 1).toUpperCase() + value.slice(1)
    }
  },

  computed: {
    postsCount () {
      return countObjectProperty(this.user.posts)
    },
    topicsCount () {
      return countObjectProperty(this.user.topics )
    },
    posts () {
      return Object.values(this.sourceData.posts)
        .filter(post => post.userId === this.user['.key'])
    },
    ...mapState({
      sourceData: state => state.sourceData
    }),
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

<style lang="scss" lang="./styel.scss"></style>

<template>
  <div class="post-list">
    <paginate
      name="postsPaginate"
      :list="posts"
      tag="div"
      :per="per"
    >
    <post-list-item
      v-for="post in paginated('postsPaginate')"
      :key="post['.key']"
      :post="post" />
    </paginate>
    <paginate-links
      v-if="checkPostsMajorPer"
      :limit="4"
      :show-step-links="true"
      for="postsPaginate"
      :classes="{
        'ul': 'el-pager'
      }"
    ></paginate-links>
  </div>
</template>

<script>
import PostListItem from './PostListItem'
export default {
  components: {
    PostListItem
  },

  props: {
    posts: {
      type: Array,
      required: true
    },
    per: {
      type: Number,
      default: 10
    }
  },

  computed: {
    checkPostsMajorPer () {
      return this.posts.length > this.per
    }
  },

  data () {
    return {
      paginate: ['postsPaginate']
    }
  }
}
</script>

<style lang="scss">
</style>

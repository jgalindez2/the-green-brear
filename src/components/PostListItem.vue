<template>
  <div class="post-list-item border-bottom mt-4">
    <el-row>
      <el-col :span="3" class="text-center mt-2">
        <img class="rounded" :src="user.avatar" width="80" height="80" alt="">
        <p class="grey-color text-center mt-2 mb-0">
          {{ user.name }} - {{ postsUserCount }}
        </p>
      </el-col>
      <el-col :span="19">
        <p class="ml-3">{{ post.text }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import data from '@/catalog/data'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {}
  },

  computed: {
    user () {
      return data.users[this.post.userId]
    },
    postsUserCount () {
      return Object.values(data.posts).filter(post => post.userId === this.user['.key']).length
    }
  }
}
</script>

<style>

</style>

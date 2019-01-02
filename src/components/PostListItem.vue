<template>
  <div class="post-list-item border-bottom mt-4">
    <el-row>
      <el-col :span="3" class="text-center ">
        <div class="mt-1">
          <img class="rounded" :src="user.avatar" width="80" height="80" alt="">
          <p class="grey-color text-center mt-2 mb-0">
            {{ user.name }}
          </p>
          <p class="grey-color">Posts: <b>{{ postsUserCount }}</b></p>
        </div>
      </el-col>
      <el-col :span="19">
        <p class="ml-3 text-justify">{{ post.text }}</p>
        <p class="grey-color date-info">
          <font-awesome-icon icon="calendar-alt" size="1x" />
          Posted on: {{ post.publishedAt | moment("dddd, MMMM Do YYYY") }}
        </p>
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

<style lang="scss">
  .post-list-item {
    .date-info {
      position: absolute;
      right: 100px;
      bottom: 0;
    }
  }
</style>

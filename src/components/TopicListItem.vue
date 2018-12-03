<template>
  <div class="topic-list-item">
    <el-col :span="16" class="mb-2 pb-3">
      <div class="text-left">
        <img class="rounded" :src="user.avatar" width="60" height="60" alt="">
        <div class="d-inline-block align-middle ml-3">
          <router-link tag="h2" class="mb-1 title" :to="{ name: 'TopicShow', params: { id: topic['.key'] } }"> {{ topic.title }} </router-link>
          <span class="grey-color">
            <font-awesome-icon icon="user" size="1x" />
            {{ user.name }}
          </span>
          <span> - </span>
          <span class="grey-color">
            <font-awesome-icon icon="calendar-alt" size="1x" />
            {{ topic.publishedAt | moment('from', 'now') }}
          </span>
        </div>
      </div>
    </el-col>
    <el-col :span="2"><span class="font-weight-bold">{{ postsCount }}</span></el-col>
    <el-col :span="2"><span class="font-weight-bold">{{topic.views}}</span> </el-col>
    <el-col class="text-left pl-3" :span="4">
      <img class="rounded" :src="lastUserReply.avatar" width="40" height="40" alt="">
      <div class="d-inline-block align-middle ml-3">
        <p class="limit-name mb-0 green-color">{{ lastUserReply.name }}</p>
        <small class="grey-color">{{ topic.lastPostAt | moment('from', 'now') }}</small>
      </div>
    </el-col>
  </div>
</template>

<script>
import data from '@/catalog/data.json'
export default {
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    postsCount () {
      return Object.keys(this.topic.posts).length - 1
    },
    user () {
      return data.users[this.topic.userId]
    },
    lastUserReply () {
      return data.users[data.posts[this.topic.lastPostId].userId]
    }
  }
}
</script>

<style>

</style>

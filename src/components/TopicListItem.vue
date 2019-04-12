<template>
  <div class="topic-list-item">
    <el-row>
      <el-col :span="16" class="mb-2 pb-3">
        <div class="text-left d-flex">
          <img v-if="user" class="rounded" :src="user.avatar" width="60" height="60" alt="">
          <div class="d-inline-block align-middle ml-3">
            <router-link tag="h2" class="mb-1 title" :to="{ name: 'Topic', params: { id: topic['.key'] } }"> {{ topic.title }} </router-link>
            <span v-if="user" class="grey-color">
              <font-awesome-icon icon="user" size="1x" />
              {{ user.name }}
            </span>
            <span> - </span>
            <span class="grey-color">
              <font-awesome-icon icon="calendar-alt" size="1x" />
              {{ topic.publishedAt | moment("dddd, MMMM Do YYYY") }}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="2"><span class="font-weight-bold">{{ postsCount }}</span></el-col>
      <el-col :span="2"><span class="font-weight-bold">{{topic.views}}</span> </el-col>
      <el-col class="text-left pl-3" :span="4">
        <img class="rounded" :src="lastUserReply.avatar" width="40" height="40" alt="">
        <div class="d-inline-block align-middle ml-2">
          <p class="limit-name mb-0 green-color">{{ lastUserReply.name }}</p>
          <small class="grey-color">{{ topic.lastPostAt | moment('from', 'now') }}</small>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { countObjectProperty } from '@/utils/'
export default {
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  computed: {
    user () {
      return this.users[this.topic.userId]
    },
    postsCount () {
      return countObjectProperty(this.topic.posts) - 1
    },
    lastUserReply () {
      return this.posts[this.topic.lastPostId] ? this.users[this.posts[this.topic.lastPostId].userId] : {}
    },
    ...mapState({
      posts: state => state.posts.items,
      users: state => state.users.items
    })
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variable';

.topic-list-item{
  .limit-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
  }
  .title {
    color: $themecolor;
    cursor: pointer;
    &:hover{
      color: #5c6f5c;
      text-decoration: underline;
    }
  }
}
</style>

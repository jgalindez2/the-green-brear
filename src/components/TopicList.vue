<template>
  <div class="topic-list">
    <el-row class="pb-3" :gutter="10" justify="space-between">
      <el-col :span="16">
        <div class="header-title">
          <p class="text-left"><b>Topics</b></p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="header-title">
          <p><b>Posts</b></p>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="header-title">
          <p><b>Views</b></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header-title">
          <p><b>Last post</b></p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <topic-list-item
        v-for="topic in topics"
        :key="topic['.key']"
        :topic="topic" />
    </el-row>
  </div>
</template>

<script>
import TopicListItem from './TopicListItem'
export default {
  props: {
    topics: {
      required: true,
      type: Array
    }
  },
  components: {
    TopicListItem
  }
}
</script>
<style>

</style>

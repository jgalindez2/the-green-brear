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
      <paginate
        name="topicsPaginate"
        :list="topics"
        tag="div"
        :per="8"
      >
      <topic-list-item
        v-for="topic in paginated('topicsPaginate')"
        :key="topic['.key']"
        :topic="topic" />
      </paginate>
      <paginate-links
        :limit="4"
        :show-step-links="true"
        for="topicsPaginate"
        :classes="{
          'ul': 'el-pager'
        }"
      ></paginate-links>
  </div>
</template>

<script>
import TopicListItem from './TopicListItem'
export default {
  props: {
    topics: {
      required: true,
      type: Array,
      default () {
        return []
      }
    }
  },

  components: {
    TopicListItem
  },

  data () {
    return {
      paginate: ['topicsPaginate']
    }
  }
}
</script>
<style lang="scss"></style>

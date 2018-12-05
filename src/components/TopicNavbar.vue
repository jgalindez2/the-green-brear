<template>
  <div class="topic-navbar">
    <el-card class="box-card">
      <div slot="header" class="clearfix text-left">
        <slot name="title"></slot>
      </div>
      <div v-for="topic in topics" :key="topic['.key']" class="text item d-flex border-bottom mb-2">
        <div class="mr-2">
          <font-awesome-icon icon="comments" size="1x" />
        </div>
        <router-link class="d-inline-block mb-2 text-left" :to="{ name: 'TopicShow', params: { id: topic['.key'] } }"> {{ topic.title }}</router-link>
      </div>
    </el-card>
    <br>
  </div>
</template>

<script>
export default {
  props: {
    topics: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>

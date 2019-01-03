<template>
  <div class="topic-navbar">
    <el-card class="box-card">
      <div slot="header" class="clearfix text-left">
        <slot name="title"></slot>
      </div>
      <div v-for="topic in topics" :key="topic['.key']" class="text item d-flex mb-2">
        <div class="mr-2">
          <font-awesome-icon icon="comments" size="1x" />
        </div>
        <router-link class="d-inline-block mb-2 text-left title" :to="{ name: 'Topic', params: { id: topic['.key'] } }"> {{ topic.title }}</router-link>
      </div>
    </el-card>
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

<style lang="scss" scoped>
  @import '../assets/styles/variable';

  .topic-navbar{
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0;
    }
    .el-card__header{
      background-color: #EEF4E8;
    }
    .title {
      color: $themecolor;
      cursor: pointer;
      &:hover{
        color: #5c6f5c;
        text-decoration: underline;
      }
    }
    .item{
      border-bottom: 1px solid #dee2e6;
      &:last-child{
        border-bottom: none;
      }
    }
  }
</style>

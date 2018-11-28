<template>
  <div id="app">
    <el-menu :default-active="$route.path" active-text-color="#738a73" :router="true" class="el-menu-demo" mode="horizontal">
      <div class="brand-icon">
        <font-awesome-icon :icon="['fab', 'gofore']" size="4x" />
        <span>The Green Bear</span>
      </div>
      <el-submenu class="float-right" index="/categories">
        <template slot="title">Categories</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-submenu>
      <el-menu-item class="float-right" index="/about">Unanswered Topics</el-menu-item>
      <el-menu-item class="float-right" index="/">Home</el-menu-item>
    </el-menu>
    <div class="header-bg">
      <img src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <el-container>
      <el-main>
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
          <el-col  :span="4">
            <div class="header-title">
              <p><b>Last post</b></p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div v-for="topic in topics" :key="topic['.key']">
            <el-col :span="16" class="mb-2 pb-3">
              <div class="text-left">
                <img class="rounded" :src="users[topic.userId].avatar" width="60" height="60" alt="">
                <div class="d-inline-block align-middle ml-3">
                  <h2 class="mb-1 green-color">{{ topic.title }}</h2>
                  <span class="grey-color">
                    <font-awesome-icon icon="user" size="md" />
                    {{ users[topic.userId].name }}
                  </span>
                  <span> - </span>
                  <span class="grey-color">
                    <font-awesome-icon icon="calendar-alt" size="md" />
                    {{ topic.publishedAt | moment('from', 'now') }}
                  </span>
                </div>
              </div>
            </el-col>
            <el-col :span="2"><span class="font-weight-bold">{{ Object.keys(topic.posts).length }}</span></el-col>
            <el-col :span="2"><span class="font-weight-bold">{{topic.views}}</span> </el-col>
            <el-col class="text-left pl-3" :span="4">
              <img class="rounded" :src="users[posts[topic.lastPostId].userId].avatar" width="40" height="40" alt="">
              <div class="d-inline-block align-middle ml-3">
                <p class="limit-name mb-0 green-color">{{ users[posts[topic.lastPostId].userId].name }}</p>
                <small class="grey-color">{{ topic.lastPostAt | moment('from', 'now') }}</small>
              </div>
            </el-col>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import data from './catalog/data.json'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      categories: data.categories,
      posts: data.posts,
      topics: data.topics,
      users: data.users
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .limit-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 130px;
  }
  .header-title{
    border-bottom: 2px solid #738a73;
  }
  .green-color{
    color: #738a73;
  }
  .grey-color {
    color: #999;
  }
  .brand-icon{
    float: left;
    margin-left: 10px;
    color: #738a73;
    span{
      vertical-align: 20px;
      margin-left: 10px;
    }
  }
}
</style>

<style lang="scss" src="@/assets/styles/main.scss"></style>

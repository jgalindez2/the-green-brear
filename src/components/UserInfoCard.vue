<template>
  <el-card class="user-info-card">
    <div class="text-center mx-auto d-inline-block">
    <img v-if="user.avatar" width="180" height="180" class="rounded" :src="user.avatar" alt="">
    <Avatar :size="80" v-else :username="user.name"/>
    </div>
    <h1 class="mt-2">{{ user.username }}</h1>
    <h3 class="mb-0">{{ user.name }}</h3>
    <p class="mb-0">{{ user.bio ? user.bio : 'No bio specified' }}</p>
    <p class="mb-2">Online</p>
    <h4 class="mb-2">{{ postsCount }} Posts - {{ topicsCount }} Topics </h4>
    <template v-if="user.website">
      <hr>
      <a href="">batman.com</a>
    </template>
    <router-link class="edit-button" v-if="!editMode" to="/me/edit">
      <el-button class="d-block mx-auto mb-2" type="primary">Edit profile</el-button>
    </router-link>
    <small>Member since: <strong>{{ user.registerAt | moment("MMMM Do YYYY") }}.</strong></small>
  </el-card>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    postsCount: {
      required: true,
      type: Number
    },
    topicsCount: {
      required: true,
      type: Number
    },
    editMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
  .user-info-card{
    text-align: center;
    .edit-button{
      text-decoration: none !important;
    }
  }
</style>

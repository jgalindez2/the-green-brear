<template>
  <el-row>
    <el-col :span="16" class="mb-2 pb-3">
      <div class="text-left d-flex">
        <span class="grey-color">
          <font-awesome-icon class="mt-2" :icon="getIcon()" size="3x" />
        </span>
        <div class="d-inline-block align-middle ml-3">
          <router-link tag="h2" class="mb-1 title link" :to="{ name: 'Category', params: { slug: category.slug } }"> {{ category.name }} </router-link>
          <p class="gray-color">{{ category.description }}</p>
        </div>
      </div>
    </el-col>
    <el-col :span="2"><span class="font-weight-bold">{{ topicsCount(category) }}</span></el-col>
    <el-col :span="2"><span class="font-weight-bold">{{ postsCount(category) }}
    </span> </el-col>
    <el-col class="text-left pl-3" :span="4">
      <img class="rounded" :src="lastUserReply(category).avatar" width="40" height="40" alt="">
      <div class="d-inline-block align-middle ml-2">
        <p class="limit-name mb-0 green-color">{{ lastUserReply(category).name }}</p>
        <small class="grey-color">{{ lastPost(category).publishedAt | moment('from', 'now') }}</small>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { countObjectProperty } from '@/utils/'
import { mapState } from 'vuex'
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState([
      'users',
      'topics'
    ])
  },

  methods: {
    getIcon () {
      const name = this.category.name
      switch (name) {
        case 'Comedy':
          return 'grin-squint-tears'
        case 'Discussions':
          return 'comments'
        case 'Feedback & Information':
          return 'info-circle'
        default:
          return 'book-reader'
      }
    },
    topicsCategory (key) {
      return Object.values(this.topics)
        .filter(topic => topic.categoryId === key)
    },
    topicsCount (category) {
      return countObjectProperty(category.topics)
    },
    postsCount (category) {
      return this.topicsCategory(category['.key'])
        .map(topic => Object.values(topic.posts).length)
        .reduce((total, num) => total + num)
    },
    lastUserReply (category) {
      return Object.values(this.users)
        .find(user => user['.key'] === this.lastPost(category).userId)
    },
    lastPost (category) {
      return this.topicsCategory(category['.key'])
        .sort((a, b) => a.lastPostAt - b.lastPostAt)[0]
    }
  }
}
</script>

<style>

</style>

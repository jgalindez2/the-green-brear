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
        <div class="d-flex flex-column">
          <p v-if="!editMode" class="ml-3 mb-5 text-justify" v-html="post.text"></p>
          <div v-else class="edit-mode mb-2">
            <vue-editor v-model="post.text" placeholder="Type your message here" :editorToolbar="editorOptions"></vue-editor>
            <div class="float-left">
              <el-button @click="editMode = false" class="mt-2">Cancel</el-button>
              <el-button class="mt-2" type="primary" @click="submit(post)">Update Post</el-button>
            </div>
          </div>
          <p class="grey-color date-info ml-auto mt-auto">
            <font-awesome-icon v-if="!editMode" @click="editMode = true" icon="edit" size="1x" class="mr-3 link"></font-awesome-icon>
            <font-awesome-icon  icon="calendar-alt" size="1x" />
            {{ post.publishedAt | moment("dddd, MMMM Do YYYY") }}
            <small v-if="post.edited"><font-awesome-icon icon="info-circle" size="1x"></font-awesome-icon> Edited</small>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { editorOptions } from '@/utils/'
import { VueEditor } from 'vue2-editor'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    VueEditor
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      editorOptions,
      editMode: false
    }
  },

  computed: {
    ...mapState({
      sourceData: state => state.sourceData
    }),
    user () {
      return this.sourceData.users[this.post.userId]
    },
    postsUserCount () {
      return Object.values(this.sourceData.posts).filter(post => post.userId === this.user['.key']).length
    }
  },

  methods: {
   async submit (post) {
     try {
      await this.updatePost({
        postId: post['.key'],
        text: post.text
      })
      this.editMode = false
     } catch (error) {
      console.log(error)
     }
    },
    ...mapActions([
      'updatePost'
    ])
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

<template>
  <div class="post-form mt-4">
    <el-row>
      <el-col :span="3" class="text-center">
        <div class="mt-1">
          <img class="rounded" :src="user.avatar" width="80" height="80" alt="">
          <p class="grey-color text-center mt-2 mb-0">
            {{ user.name }}
          </p>
          <p class="grey-color">Posts: <b>{{ userPostsLength }}</b></p>
        </div>
      </el-col>
      <el-col :span="19">
        <vue-editor v-model="text" placeholder="Type your message here" :editorToolbar="editorOptions"></vue-editor>
        <el-button class="mt-2" type="primary" @click="onSubmit">Post Reply</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { countObjectProperty, editorOptions } from '@/utils/'
import { VueEditor } from 'vue2-editor'
import { mapGetters } from 'vuex'
export default {
  components: {
    VueEditor
  },

  data () {
    return {
      text: '',
      editorOptions
    }
  },

  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    userPostsLength () {
      return countObjectProperty(this.user.posts)
    }
  },

  methods: {
    onSubmit () {
      this.$emit('submit', this.text)
      this.text = ''
    }
  }
}
</script>

<style lang="scss"></style>

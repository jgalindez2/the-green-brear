<template>
  <div class="post-form mt-4">
    <el-row>
      <el-col :span="3" class="text-center">
        <div class="mt-1">
          <img class="rounded" src="http://i.imgur.com/6MuObMP.jpg" width="80" height="80" alt="">
          <p class="grey-color text-center mt-2 mb-3">
            John Doe
          </p>
          <p class="grey-color">Posts: <b>8</b></p>
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
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },

  data () {
    return {
      text: '',
      editorOptions: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'align': [] }]
      ]
    }
  },

  methods: {
    onSubmit () {
      this.$emit('submit', this.text)
    }
  }
}
</script>

<style lang="scss"></style>

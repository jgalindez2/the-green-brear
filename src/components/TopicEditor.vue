<template>
  <div class="topic-editor">
    <el-form label-position="top" label-width="100px">
      <el-form-item label="Title">
        <el-input placeholder="Enter the title" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Content">
        <vue-editor v-model="form.text" placeholder="Type your content here" :editorToolbar="editorOptions"></vue-editor>
      </el-form-item>
      <el-form-item class="mt-2">
        <el-button type="default" @click="$emit('cancel')">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">{{ isUpdate ? 'Edit' : 'Post' }} </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { editorOptions } from '@/utils/'
export default {
  components: {
    VueEditor
  },
  
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      },
      editorOptions
    }
  },

  computed: {
    isUpdate () {
      return !!this.title
    }
  },

  methods: {
    onSubmit () {
      this.$emit('save', { title: this.form.title, text: this.form.text })
    }
  }
}
</script>

<style>

</style>

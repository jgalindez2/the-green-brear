<template src="./template.html"></template>

<script>
import { mapActions } from 'vuex'
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },

  props: {
    category: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      title: '',
      content: '',
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
      this.createTopic({
        title: this.title,
        content: this.content,
        categoryId: this.category['.key']
      })
    },
    ...mapActions([
      'createTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss">

</style>

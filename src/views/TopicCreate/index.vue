<template src="./template.html"></template>

<script>
import { mapActions, mapState } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import TopicEditor from '@/components/TopicEditor'
export default {
  components: {
    TopicEditor
  },
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  mixins: [asyncDataStatus],
  data () {
    return {
      saved: false
    }
  },
  computed: {
    category () {
      return this.categories ? Object.values(this.categories).find(c => c['.key'] === this.categoryId) : {}
    },
    hasUnsaved () {
      return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.saved
    },
    ...mapState({
      categories: state => state.categories.items
    })
  },
  async created () {
    await this['categories/fetchCategories']()
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasUnsaved) {
      const confirm = window.confirm('Do you want to leave?')
      confirm ? next() : next(false)
    } else {
      next()
    }
  },
  methods: {
    async save ({ title, text }) {
      try {
        const topic = await this['topics/createTopic']({
          title,
          text,
          categoryId: this.categoryId
        })
        this.saved = true
        this.$router.push({ name: 'Topic', params: { id: topic['.key'] } })
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      this.$router.go(-1)
    },
    ...mapActions([
      'categories/fetchCategories',
      'topics/createTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

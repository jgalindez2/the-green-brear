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
  computed: {
    category () {
      return this.categories ? Object.values(this.categories).find(c => c['.key'] === this.categoryId) : {}
    },
    ...mapState([
      'categories'
    ])
  },
  async created () {
    await this.fetchCategories()
    this.asyncDataStatus_fetched()
  },
  methods: {
    async save ({ title, text }) {
      try {
        const topic = await this.createTopic({
          title,
          text,
          categoryId: this.categoryId
        })
        this.$router.push({ name: 'Topic', params: { id: topic['.key'] } })
      } catch (error) {
        console.log(error)
      }
    },
    cancel () {
      this.$router.go(-1)
    },
    ...mapActions([
      'fetchCategories',
      'createTopic'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

<template src="./template.html"></template>

<script>
import data from '@/catalog/data.json'
import TopicList from '@/components/TopicList'
export default {
  components: {
    TopicList
  },
  data () {
    return {}
  },
  computed: {
    topics () {
      return Object.values(data.topics)
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

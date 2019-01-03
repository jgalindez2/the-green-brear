<template>
  <div class="category-list">
    <category-list-item v-for="category in categories" :category="category" class="category-list-item" :key="category['.key']">
    </category-list-item>
  </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
export default {
  components: {
    CategoryListItem
  },

  props: {
    categories: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>

</style>

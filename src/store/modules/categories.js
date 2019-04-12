import { appendChildToParentMutation } from '../utils'

export default {
  namespaced: true,

  store: {
    items: {}
  },

  actions: {
    async fetchCategory ({ dispatch }, slug) {
      return dispatch('fetchItemByName', { ref: 'categories', order: 'slug', value: slug }, { root: true })
    },
    async fetchCategoryTopics ({ dispatch }, id) {
      return dispatch('fetchItemByName', { ref: 'topics', order: 'categoryId', value: id }, { root: true })
    },
    async fetchCategories ({ dispatch }) {
      return dispatch('fetchItems', 'categories', { root: true })
    }
  },

  mutations: {
    appendTopicToCategory: appendChildToParentMutation({ parent: 'categories', child: 'topics' })
  }
}

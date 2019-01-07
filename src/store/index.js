import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/catalog/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sourceData,
    userId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1'
  },
  mutations: {
    setPost (state, post) {
      state.sourceData.posts = Object.assign({}, state.sourceData.posts, post)
    },
    appendPostToTopic (state, { postId, topicId }) {
      const topic = state.sourceData.topics[topicId]
      topic.posts = Object.assign({}, topic.posts, { [postId]: postId })
    },
    appentPostToUser (state, { postId, userId }) {
      const user = state.sourceData.users[userId]
      user.posts = Object.assign({}, user.posts, { [postId]: postId })
    }
  },
  actions: {
    savePost (context, post) {
      const key = '_' + Math.random().toString(36).substr(2, 9)
      const publishedAt = new Date().getTime()
      const newPost = {
        [key]: {
          ...post,
          ...{ '.key': key, publishedAt, userId: context.state.userId }
        }
      }
      context.commit('setPost', newPost)
      context.commit('appendPostToTopic', { postId: key, topicId: post.topicId })
      context.commit('appentPostToUser', { postId: key, userId: context.state.userId })
    }
  }
})

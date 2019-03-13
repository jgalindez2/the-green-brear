import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/catalog/data'
import firebase from 'firebase'

Vue.use(Vuex)

const appendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const parentToAppend = state.sourceData[parent][parentId]
    parentToAppend[child] = Object.assign({}, parentToAppend[child], { [childId]: childId })
  }
}
export default new Vuex.Store({
  state: {
    sourceData,
    topic: null,
    categories: null,
    posts: null,
    userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    getUser: state => state.sourceData.users[state.userId]
  },
  mutations: {
    setTopics (state, topic) {
      state.sourceData.topics = Object.assign({}, state.sourceData.topics, topic)
    },
    setPost (state, post) {
      state.sourceData.posts = Object.assign({}, state.sourceData.posts, post)
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setTopic (state, topic) {
      state.topic = topic
    },
    updateUser (state, user) {
      Vue.set(state.sourceData.users, user['.key'], user)
    },
    udpateTopic (state, topic) {
      Vue.set(state.sourceData.topics, topic['.key'], topic)
    },
    udpatePost (state, post) {
      Vue.set(state.sourceData.posts, post['.key'], post)
    },
    appendPostToTopic: appendChildToParentMutation({ parent: 'topics', child: 'posts' }),
    appendPostToUser: appendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendTopicToCategory: appendChildToParentMutation({ parent: 'categories', child: 'topics' }),
    appendTopicToUser: appendChildToParentMutation({ parent: 'users', child: 'topics' })
  },
  actions: {
    async fetchTopic ({ commit }, id) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('topics').child(id).once('value', snapshot => {
          const topic = { ...snapshot.val(), '.key': snapshot.key }
          commit('setTopic', topic)
          return resolve(topic)
        })
      })
    },
    async fetchCategories ({ commit }) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categories = snapshot.val()
          commit('setCategories', categories)
          return resolve(categories)
        })
      })
    },
    async fetchPosts ({ commit }) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('posts').once('value', snapshot => {
          const posts = snapshot.val()
          commit('setPosts', posts)
          return resolve(posts)
        })
      })
    },
    async fetchTopicPosts ({ commit }, key) {
      return new Promise((resolve, reject) => {
        firebase.database().ref('posts').orderByChild('topicId').equalTo(key).once('value', snapshot => {
          return resolve(Object.values(snapshot.val()))
        })
      })
    },
    async createTopic ({ state, commit, dispatch }, { title, text, categoryId }) {
      try {
        const key = '_' + Math.random().toString(36).substr(2, 9)
        const publishedAt = new Date().getTime()
        const userId = state.userId
        const newTopic = {
          [key]: {
            categoryId,
            title,
            publishedAt,
            userId,
            views: 0,
            lastPostId: '-Kvfw0huq0j2O00bOiWd',
            '.key': key
          }
        }
        commit('setTopic', newTopic)
        commit('appendTopicToCategory', { childId: key, parentId: categoryId })
        commit('appendTopicToUser', { childId: key, parentId: userId })
        const post = await dispatch('savePost', { text, topicId: key })
        commit('udpateTopic', { ...newTopic[key], firstPostId: post['.key'] })
        return key
      } catch (error) {
        return error
      }
    },
    async updateTopic ({ state, commit, dispatch }, { title, text, topicId }) {
      try {
        const topic = state.sourceData.topics[topicId]
        commit('udpateTopic', { ...topic, title })
        dispatch('updatePost', { postId: topic.firstPostId, text })
        return topic['.key']
      } catch (error) {
        return error
      }
    },
    async updatePost ({ state, commit }, { postId, text }) {
      try {
        const post = state.sourceData.posts[postId]
        commit('udpatePost', { ...post, text, edited: { at: new Date().getTime(), by: state.userId } })
      } catch (error) {
        return error
      }
    },
    async savePost (context, post) {
      try {
        const key = '_' + Math.random().toString(36).substr(2, 9)
        const publishedAt = new Date().getTime()
        const newPost = {
          [key]: {
            ...post,
            ...{ '.key': key, publishedAt, userId: context.state.userId }
          }
        }
        context.commit('setPost', newPost)
        context.commit('appendPostToTopic', { childId: key, parentId: post.topicId })
        context.commit('appendPostToUser', { childId: key, parentId: context.state.userId })
        return context.state.sourceData.posts[key]
      } catch (error) {
        return error
      }
    },
    editUser (context, user) {
      context.commit('updateUser', user)
    }
  }
})

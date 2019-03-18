import Vue from 'vue'
import Vuex from 'vuex'
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
    topic: {},
    categories: {},
    posts: {},
    users: {},
    topics: {},
    userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    getUser: state => {
      return state.users[state.userId]
    }
  },
  mutations: {
    setTopics (state, topic) {
      state.topics = Object.assign({}, state.topics, topic)
    },
    setPost (state, post) {
      state.posts = Object.assign({}, state.posts, post)
    },
    setItems (state, { ref, items }) {
      state[ref] = items
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    setUsers (state, users) {
      state.users = users
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setTopic (state, topic) {
      state.topic = topic
    },
    updateUser (state, user) {
      Vue.set(state.users, user['.key'], user)
    },
    udpateTopic (state, topic) {
      Vue.set(state.topics, topic['.key'], topic)
    },
    udpatePost (state, post) {
      Vue.set(state.posts, post['.key'], post)
    },
    appendPostToTopic: appendChildToParentMutation({ parent: 'topics', child: 'posts' }),
    appendPostToUser: appendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendTopicToCategory: appendChildToParentMutation({ parent: 'categories', child: 'topics' }),
    appendTopicToUser: appendChildToParentMutation({ parent: 'users', child: 'topics' })
  },
  actions: {
    async fetchTopic ({ dispatch }, id) {
      return dispatch('fetchItemById', { ref: 'topics', id })
    },
    async fetchCategory ({ dispatch }, slug) {
      return dispatch('fetchItemByName', { ref: 'categories', order: 'slug', value: slug })
    },
    async fetchTopicPosts ({ dispatch }, id) {
      return dispatch('fetchItemByName', { ref: 'posts', order: 'topicId', value: id })
    },
    async fetchTopics ({ dispatch }) {
      return dispatch('fetchItems', 'topics')
    },
    async fetchCategories ({ dispatch }) {
      return dispatch('fetchItems', 'categories')
    },
    async fetchPosts ({ dispatch }) {
      return dispatch('fetchItems', 'posts')
    },
    async fetchUsers ({ dispatch }) {
      return dispatch('fetchItems', 'users')
    },
    async fetchItemByName ({ commit }, { ref, order, value }) {
      return new Promise((resolve, reject) => {
        firebase.database().ref(ref).orderByChild(order).equalTo(value).once('value', snapshot => {
          return resolve(snapshot.val())
        })
      })
    },
    async fetchItemById ({ commit }, { ref, id }) {
      return new Promise((resolve, reject) => {
        firebase.database().ref(ref).child(id).once('value', snapshot => {
          const item = { ...snapshot.val(), '.key': snapshot.key }
          return resolve(item)
        })
      })
    },
    async fetchItems ({ commit }, ref) {
      return new Promise((resolve, reject) => {
        firebase.database().ref(ref).once('value', snapshot => {
          const items = snapshot.val()
          for (const key in items) {
            items[key] = { ...items[key], '.key': key }
          }
          commit('setItems', { ref, items })
          return resolve(items)
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
        const topic = state.topics[topicId]
        commit('udpateTopic', { ...topic, title })
        dispatch('updatePost', { postId: topic.firstPostId, text })
        return topic['.key']
      } catch (error) {
        return error
      }
    },
    async updatePost ({ state, commit }, { postId, text }) {
      try {
        const post = state.posts[postId]
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
        return context.state.posts[key]
      } catch (error) {
        return error
      }
    },
    editUser (context, user) {
      context.commit('updateUser', user)
    }
  }
})

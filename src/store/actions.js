import firebase from 'firebase'

export default {
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
  async fetchUser ({ dispatch }, id) {
    return dispatch('fetchItemById', { ref: 'users', id })
  },
  async fetchItemByName ({ commit }, { ref, order, value }) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).orderByChild(order).equalTo(value).once('value', snapshot => {
        const items = snapshot.val()
        for (const key in items) {
          items[key] = { ...items[key], '.key': key }
        }
        commit('setItems', { ref, items })
        return resolve(items)
      })
    })
  },
  async fetchItemById ({ commit }, { ref, id }) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).child(id).once('value', snapshot => {
        const item = {
          [snapshot.key]: {
            ...snapshot.val(), '.key': snapshot.key
          }
        }
        commit('setItems', { ref, items: item })
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
      const topicKey = firebase.database().ref('topics').push().key
      const postKey = firebase.database().ref('post').push().key
      const publishedAt = new Date().getTime()
      const userId = state.userId
      const newTopic = { categoryId, title, publishedAt, userId, firstPostId: postKey, posts: {}, views: 0 }
      newTopic.posts[postKey] = postKey
      const newPost = { text, publishedAt, topicId: topicKey, userId }

      const updates = {}
      updates[`topics/${topicKey}`] = newTopic
      updates[`categories/${newTopic.categoryId}/topics/${topicKey}`] = topicKey
      updates[`users/${newTopic.userId}/topics/${topicKey}`] = topicKey

      updates[`posts/${postKey}`] = newPost
      updates[`users/${newPost.userId}/posts/${postKey}`] = postKey

      await firebase.database().ref().update(updates)

      commit('setItems', { ref: 'topics', items: { [topicKey]: { ...newTopic, '.key': topicKey } } })
      commit('appendTopicToCategory', { childId: topicKey, parentId: categoryId })
      commit('appendTopicToUser', { childId: topicKey, parentId: userId })

      commit('setItems', { ref: 'posts', items: { [postKey]: { ...newPost, '.key': postKey } } })
      commit('appendPostToTopic', { childId: postKey, parentId: topicKey })
      commit('appendPostToUser', { childId: postKey, parentId: userId })

      return Promise.resolve(state.topics[topicKey])
    } catch (error) {
      return Promise.resolve(error)
    }
  },
  async savePost (context, post) {
    try {
      const key = firebase.database().ref('posts').push().key
      const publishedAt = new Date().getTime()
      const newPost = {
        ...post,
        publishedAt,
        userId: context.state.userId
      }
      const updates = {}
      updates[`posts/${key}`] = newPost
      updates[`topics/${newPost.topicId}/posts/${key}`] = key
      updates[`users/${newPost.userId}/posts/${key}`] = key
      await firebase.database().ref().update(updates)

      context.commit('setItems', { ref: 'posts', items: { [key]: { ...newPost, '.key': key } } })
      context.commit('appendPostToTopic', { childId: key, parentId: post.topicId })
      context.commit('appendPostToUser', { childId: key, parentId: context.state.userId })
      return Promise.resolve(context.state.posts[key])
    } catch (error) {
      return Promise.reject(error)
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
  editUser (context, user) {
    context.commit('updateUser', user)
  }
}

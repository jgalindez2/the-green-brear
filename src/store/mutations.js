import Vue from 'vue'

const appendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const parentToAppend = state.sourceData[parent][parentId]
    parentToAppend[child] = Object.assign({}, parentToAppend[child], { [childId]: childId })
  }
}

export default {
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
}

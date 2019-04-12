import firebase from 'firebase'

export default {
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
  }
}

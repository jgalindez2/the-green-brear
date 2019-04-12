export default {
  setItems (state, { ref, items }) {
    if (!items) {
      state[ref].items = {}
      return
    }
    state[ref].items = Object.assign({}, state[ref].items, items)
  }
}

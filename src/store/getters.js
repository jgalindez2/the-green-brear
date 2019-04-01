export default {
  getUser: state => {
    return state.userId ? state.users[state.userId] : null
  }
}

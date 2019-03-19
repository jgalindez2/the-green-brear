export default {
  getUser: state => {
    return state.users[state.userId]
  }
}

<template src="./template.html"></template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { countObjectProperty } from '@/utils/'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import UserInfoCard from '@/components/UserInfoCard'
import UserFormEdit from '@/components/UserFormEdit'
import PostsList from '@/components/PostsList'
export default {
  components: {
    PostsList,
    UserInfoCard,
    UserFormEdit
  },
  mixins: [asyncDataStatus],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    capitalize (value) {
      return value.substring(0, 1).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    postsCount () {
      return this.asyncDataStatus_ready ? countObjectProperty(this.user.posts) : 0
    },
    topicsCount () {
      return this.asyncDataStatus_ready ? countObjectProperty(this.user.topics) : 0
    },
    userPosts () {
      return Object.values(this.posts)
    },
    ...mapState({
      posts: state => state.posts.items
    }),
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  async created () {
    if (!this.user) await this['users/fetchUser'](this.user['.key'])
    await this['posts/fetchPostsUser'](this.user['.key'])
    this.asyncDataStatus_fetched()
    this.$emit('ready')
  },
  methods: {
    saveUser (user) {
      this['users/editUser'](user)
      this.$router.push('/me')
    },
    ...mapActions([
      'posts/fetchPostsUser',
      'users/editUser',
      'users/fetchUser'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

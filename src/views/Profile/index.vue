<template src="./template.html"></template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { countObjectProperty } from '@/utils/'
import UserInfoCard from '@/components/UserInfoCard'
import UserFormEdit from '@/components/UserFormEdit'
import PostsList from '@/components/PostsList'
export default {
  components: {
    PostsList,
    UserInfoCard,
    UserFormEdit
  },

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
      return countObjectProperty(this.user.posts)
    },
    topicsCount () {
      return countObjectProperty(this.user.topics)
    },
    posts () {
      return Object.values(this.sourceData.posts)
        .filter(post => post.userId === this.user['.key'])
    },
    ...mapState({
      sourceData: state => state.sourceData
    }),
    ...mapGetters({
      user: 'getUser'
    })
  },

  methods: {
    saveUser (user) {
      this.editUser(user)
      this.$router.push('/me')
    },
    ...mapActions([
      'editUser'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

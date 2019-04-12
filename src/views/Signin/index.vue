<template src="./template.html"></template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    async signIn () {
      try {
        await this['auth/signInWithEmailAndPassword'](this.form)
        this.successRedirect()
      } catch (error) {
        alert(`Something went wrong: ${error}`)
      }
    },
    successRedirect () {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' }
      this.$router.push(redirectTo)
    },
    ...mapActions([
      'auth/signInWithEmailAndPassword'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

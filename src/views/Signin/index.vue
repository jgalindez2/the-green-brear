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
        await this.signInWithEmailAndPassword(this.form)
        this.$router.push('/')
      } catch (error) {
        alert(`Something went wrong: ${error}`)
      }
    },
    ...mapActions([
      'signInWithEmailAndPassword'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

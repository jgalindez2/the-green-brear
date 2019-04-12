<template src="./template.html"></template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: ''
      }
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    async signUp () {
      try {
        await this['auth/registerUserWithEmailAndPassword'](this.form)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    ...mapActions([
      'auth/registerUserWithEmailAndPassword'
    ])
  }
}
</script>

<style lang="scss" src="./style.scss"></style>

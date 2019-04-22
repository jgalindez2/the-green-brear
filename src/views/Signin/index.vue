<template src="./template.html"></template>

<script>
import AppSpinner from '@/components/AppSpinner'
import { mapActions } from 'vuex'
export default {
  components: {
    AppSpinner
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'This field is required' },
          { type: 'email', message: 'This format is not accepted' }
        ],
        password: [
          { required: true, message: 'This field is required' }
        ]
      },
      loading: false
    }
  },
  created () {
    this.$emit('ready')
  },
  methods: {
    validateForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitForm()
        } else {
          return false
        }
      })
    },
    async submitForm () {
      this.loading = true
      try {
        await this['auth/signInWithEmailAndPassword'](this.form)
        this.successRedirect()
      } catch (error) {
        this.loading = false
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

<template src="./template.html"></template>

<script>
import { mapActions } from 'vuex'
import AppSpinner from '@/components/AppSpinner'
export default {
  components: {
    AppSpinner
  },
  data () {
    const validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: ''
      },
      rules: {
        name: [
          { required: true, message: 'This field is required' }
        ],
        username: [
          { required: true, message: 'This field is required' }
        ],
        email: [
          { required: true, message: 'This field is required' },
          { type: 'email', message: 'This format is not accepted' }
        ],
        password: [
          { required: true, message: 'This field is required' },
          { min: 6, message: 'Min length should be 6' }
        ],
        confirmPassword: [
          { validator: validateCheckPass }
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
        if (!this.form.avatar) this.form.avatar = process.env.VUE_APP_AVATAR_URL_DEFAULT
        await this['auth/registerUserWithEmailAndPassword'](this.form)
        this.$router.push('/')
      } catch (error) {
        this.loading = false
        // TODO Add sweat alert with the error message
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

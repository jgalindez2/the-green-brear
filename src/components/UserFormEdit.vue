<template>
  <div class="user-form-edit">
    <h2 class="text-left">Update your profile</h2>
    <hr>
    <el-card>
      <p class="text-left">Complete this form to update your profile.</p>
      <el-form :rules="rules" label-position="left" ref="user-form" :model="activeUser" label-width="100px">
        <el-col :span="12">
          <el-form-item label="Username:" prop="username">
            <el-input placeholder="Enter your username" v-model="activeUser.username"></el-input>
          </el-form-item>
          <el-form-item label="Email:" prop="email">
            <el-input placeholder="Enter your email" v-model="activeUser.email"></el-input>
          </el-form-item>
          <el-form-item label="Bio:">
            <el-input placeholder="Enter your biography" type="textarea" v-model="activeUser.bio"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Name:" prop="name">
            <el-input placeholder="Enter your name" v-model="activeUser.name" ></el-input>
          </el-form-item>
          <el-form-item label="Website:">
            <el-input placeholder="Enter your website" v-model="activeUser.website"></el-input>
          </el-form-item>
          <el-form-item label="Location:">
            <el-input placeholder="Enter your location" v-model="activeUser.location"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button class="mr-4" type="primary" @click="submitForm('user-form')">Save</el-button>
            <router-link to="/me">
              <el-button>Cancel</el-button>
            </router-link>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      activeUser: { ...this.user },
      rules: {
        name: [
          { required: true, message: 'Please, the name is required', trigger: 'blur' },
          { min: 3, message: 'Length should be at least 3 characters', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Please, the username is required', trigger: 'blur' },
          { min: 3, message: 'Length should be at least 3 characters', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please, the email is required', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ]
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', { ...this.activeUser })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="user-form-edit">
    <h2 class="text-left">Update your profile</h2>
    <hr>
    <el-card>
      <el-form label-position="left" ref="form" :model="activeUser" label-width="80px">
        <el-col :span="12">
          <el-form-item label="Username:">
            <el-input v-model="activeUser.username"></el-input>
          </el-form-item>
          <el-form-item label="Email:">
            <el-input v-model="activeUser.email"></el-input>
          </el-form-item>
          <el-form-item label="Bio:">
            <el-input type="textarea" v-model="activeUser.bio"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Name:">
            <el-input v-model="activeUser.name"></el-input>
          </el-form-item>
          <el-form-item label="Website:">
            <el-input v-model="activeUser.website"></el-input>
          </el-form-item>
          <el-form-item label="Location:">
            <el-input v-model="activeUser.location"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button class="mr-4" type="primary" @click="onSubmit">Save</el-button>
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
    return{
      activeUser: { ...this.user }
    }
  },

  methods: {
    onSubmit () {}
  }
}
</script>

<style>

</style>

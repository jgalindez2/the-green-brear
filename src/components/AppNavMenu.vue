<template>
  <div class="nav-menu">
    <el-menu :default-active="$route.path" active-text-color="#738a73" :router="true" class="el-menu-demo fixed-top" mode="horizontal">
      <div class="brand-icon">
        <router-link tag="span" :to="{name: 'Home'}">TGB</router-link>
      </div>
      <el-submenu v-if="user" class="float-right user-dropdown" index="">
        <template slot="title">
          <img v-if="user.avatar" with="40" height="40" class="rounded" :src="user.avatar" alt="">
          <avatar v-else :size="40" :username="user.name"></avatar>
        </template>
        <el-menu-item index="/me">Profile</el-menu-item>
        <el-menu-item index="/logout">Sign out</el-menu-item>
      </el-submenu>
      <template v-else>
        <el-menu-item class="float-right" index="/signin">Sign In</el-menu-item>
        <el-menu-item class="float-right" index="/signup">Sign Up</el-menu-item>
      </template>
      <el-menu-item class="float-right" index="/categories">Categories</el-menu-item>
      <el-menu-item class="float-right" index="/">Home</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Avatar
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },
  methods: {
    ...mapActions('auth', ['signOut'])
  }
}
</script>

<style lang="scss">
  .nav-menu{
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1500;
    .el-menu-demo{
      box-shadow: 0 1px 10px rgba(0,0,0,.3);
    }
    .brand-icon{
      font-family: 'Nexa Rust';
      float: left;
      margin-left: 10px;
      color: #738a73;
      span{
        cursor: pointer;
        font-size: 40px;
        letter-spacing: 10px;
        vertical-align: -23px;
        margin-left: 10px;
      }
      &:focus{
        outline: none;
      }
    }
    .user-dropdown{
      .el-submenu__title{
        display: flex;
        align-items: center;
      }
    }
  }
</style>

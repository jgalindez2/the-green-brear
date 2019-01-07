<template>
  <div class="nav-menu">
    <el-menu :default-active="$route.path" active-text-color="#738a73" :router="true" class="el-menu-demo fixed-top" mode="horizontal">
      <div class="brand-icon">
        <span>TGB</span>
      </div>
      <el-submenu class="float-right" index="">
        <template slot="title"><img with="40" height="40" class="rounded" :src="user.avatar" alt=""></template>
        <el-menu-item index="/me">Profile</el-menu-item>
      </el-submenu>
      <el-menu-item class="float-right" index="/categories">Categories</el-menu-item>
      <el-menu-item class="float-right" index="/about">Unanswered Topics</el-menu-item>
      <el-menu-item class="float-right" index="/">Home</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    categories: {
      type: Array
    }
  },

  computed: {
    ...mapGetters({
      user: 'getUser'
    })
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
        font-size: 40px;
        letter-spacing: 10px;
        vertical-align: -23px;
        margin-left: 10px;
      }
    }
  }
</style>

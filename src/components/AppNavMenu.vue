<template>
  <div class="nav-menu">
    <el-menu :default-active="$route.path" active-text-color="#738a73" :router="true" class="el-menu-demo" mode="horizontal">
      <div class="brand-icon">
        <font-awesome-icon :icon="['fab', 'gofore']" size="4x" />
        <span>The Green Bear</span>
      </div>
      <el-submenu class="float-right" index="/categories">
        <template slot="title">Categories</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-submenu>
      <el-menu-item class="float-right" index="/about">Unanswered Topics</el-menu-item>
      <el-menu-item class="float-right" index="/">Home</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .brand-icon{
    float: left;
    margin-left: 10px;
    color: #738a73;
    span{
      vertical-align: 20px;
      margin-left: 10px;
    }
  }
</style>

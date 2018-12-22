<template>
  <div class="header-bg" :class="[homeView ? 'home-p' : 'normal-p']">
    <el-container>
      <el-main>
        <template v-if="homeView">
          <img width="300" height="300" src="../assets/images/bear.png">
          <h1 class="text-center">
            Welcome to the <br> Green Bear Forum
          </h1>
        </template>
        <template v-else>
          <h1>
            The Green Bear Forum
          </h1>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  computed: {
    routeName () {
      return this.$route.name
    },
    homeView () {
      return this.routeName === 'Home'
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-bg{
    background-color: rgb(128, 143, 114);
    &.home-p{
      padding: 60px 0 30px 0;
      h1{
        margin-top: -40px;
      }
    }
    &.normal-p{
      padding: 80px 0 80px 0;
      h1{
        margin-top: 50px;
      }
    }
    h1{
      font-family: 'Nexa Rust';
      color: #EEF4E8;
      font-size: 50px;
    }
  }
</style>

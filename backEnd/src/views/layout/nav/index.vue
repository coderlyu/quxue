<template>
  <div class="my-nav">
    <div class="mask" v-show="leftOpen" @click="$store.dispatch('app/closeSideBar')"></div>
    <nav class="bg-white" :style="leftOpen ? 'left: 0': ''">
      <el-menu :default-active="$route.name" class="el-menu-demo">
        <router-link to="/home">
          <el-menu-item index="homePage"><i class="el-icon-house"></i> 主页</el-menu-item>
        </router-link>
        <el-submenu index="data">
          <template slot="title"><i class="el-icon-data-analysis"></i> 数据</template>
          <router-link to="/data/question">
            <el-menu-item index="questionPage"><i class="el-icon-s-custom"></i> 问题</el-menu-item>
          </router-link>
          <router-link to="/data/user">
            <el-menu-item index="userPage"><i class="el-icon-s-check"></i> 用户</el-menu-item>
          </router-link>
          <router-link to="/data/product">
            <el-menu-item index="productPage"><i class="el-icon-s-grid"></i> 商品</el-menu-item>
          </router-link>
          <router-link to="/data/order">
            <el-menu-item index="orderPage"><i class="el-icon-s-grid"></i> 订单</el-menu-item>
          </router-link>
          <router-link to="/data/data">
            <el-menu-item index="dataPage"><i class="el-icon-s-data"></i> 图表</el-menu-item>
          </router-link>
        </el-submenu>
        <router-link to="/profile">
          <el-menu-item index="profile"><i class="el-icon-user"></i> 我的</el-menu-item>
        </router-link>
      </el-menu>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navBar',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'leftOpen',
      'isMobile'
    ])
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-menu {
  border-right:none !important;
}
nav {
  width: 220px;
  padding: 10px;
  li.el-menu-item.is-active{
    border-left: 4px solid #409EFF;
    background: #ecf3fb;
  }
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.1);
  z-index: 99;
}
@media (max-width: 768px){
  nav{
    position: fixed;
    top: 60px;
    left: -250px;
    height: 100%;
    z-index: 100;
    // box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    transition: 0.28s;
  }
}
</style>

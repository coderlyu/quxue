<template>
  <header class="bg-white my-header flex-bt">
    <h1 v-if="!isMobile" @click="toHome" class="title">趣学后台管理界面</h1>
    <i v-else :class="leftOpen ? 'el-icon-s-fold': 'el-icon-s-unfold'" @click="toggleSideBar"></i>
    <el-dropdown @command="handleClick">
      <span class="el-dropdown-link">
        <img class="avatar" :src="avatar" alt="头像">
        coderly<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home"><i class="el-icon-house"></i>Home</el-dropdown-item>
        <el-dropdown-item command="setting"><i class="el-icon-setting"></i>设置</el-dropdown-item>
        <el-dropdown-item command="logout"><i class="el-icon-position"></i>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'isMobile',
      'leftOpen',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    toHome () {
      this.$router.push('/')
    },
    toUser () {
      this.$router.push('/profile')
    },
    async handleClick (command) {
      switch (command) {
        case 'home':
          this.$router.push('/')
          break
        case 'setting':
          this.$router.push('/profile')
          break
        case 'logout':
          await this.$store.dispatch('user/logout')
          this.$router.push('/login')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-header {
  h1.title {
    color: #b3d465;
    text-shadow: 2px 2px 3px #ed536b, -2px -2px 3px #000;
    cursor: pointer;
    line-height: 60px;
  }
}
  .el-dropdown-link {
    cursor: pointer;
    color: #606266;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px){
    .my-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
  }
</style>

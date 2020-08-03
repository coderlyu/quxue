<template>
  <!-- <van-tabbar @change="activeChange" route> -->
  <van-tabbar @change="activeChange" route>
    <van-tabbar-item to="/home" name="homePage" replace icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/chat" name="chatPage" replace icon="chat-o">消息</van-tabbar-item>
    <div class="cre" @click="jumpToEditArticle">
      <van-icon name="plus" />
    </div>
    <van-tabbar-item to="/shopping" name="shoppingPage" replace icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/profile" name="profilePage" replace icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data () {
    return {
      active: 'home'
    }
  },
  methods: {
    activeChange (active) {
      // let name = this.$route.name
      // if (active === name && (name === 'chatPage' || name === 'homePage')) {
      //   let app = document.getElementById('app')
      // }
    },
    jumpToEditArticle () {
      this.$router.push({ name: 'createArticle' })
    }
  }
}
</script>
<style lang="scss" scoped>
.cre{
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #25dee6;
  border-radius: 50%;
  color: white;
  font-size: 20px;
}
</style>

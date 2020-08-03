<template>
  <div class="app-wrapper">
    <header>
      <my-header :leftArrow="this.$store.getters.isShowBack" :rightArrow="rightArrow" :title="this.$store.getters.title"></my-header>
    </header>
    <main>
      <keep-alive>
        <router-view :key="$route.fullPath"></router-view>
      </keep-alive>
    </main>
    <footer>
      <my-footer />
    </footer>
  </div>
</template>
<script>
import myFooter from '@/components/my-footer'
import myHeader from '@/components/my-header'
export default {
  components: {
    myFooter,
    myHeader
  },
  data () {
    return {
      rightArrow: 1
    }
  },
  // sockets: {
  //   connect: function () {
  //     // this.$toast('聊天功能已开启')
  //     // console.log('聊天功能已开启')
  //   },
  //   receiveMessage: function (data) {
  //     // console.log(data)
  //     // console.log('不是测试，' + '收到：' + data.from + '给： ' + data.to + '的消息： ' + data.msg)
  //     this.$store.dispatch('chatmsg/setReceiveItem', { uId: data.from, type: 1, content: data.msg })
  //   },
  //   disconnect: function () {
  //     this.$toast('聊天功能已关闭')
  //   }
  // },
  // mounted () {
  //   var timerOne = window.setInterval(() => {
  //     if (this.$socket) {
  //       this.$socket.emit('connect')
  //       window.clearInterval(timerOne)
  //     }
  //   }, 500)
  // },
  methods: {
    init () {
      // 修改header标题
      if (this.$route.meta.hasOwnProperty('title')) {
        this.$store.dispatch('utils/changeTitle', this.$route.meta.title)
      } else {
        this.$store.dispatch('utils/changeTitle', '')
      }
      // 修改header左边返回按钮
      if (this.$route.meta.hasOwnProperty('flag') && this.$route.meta.flag === 0) {
        this.$store.dispatch('utils/changeState', false)
      } else {
        this.$store.dispatch('utils/changeState', true)
      }
      // 修改header右边设置/查询
      if (this.$route.name === 'homePage') {
        this.rightArrow = 1
      } else if (this.$route.name === 'profilePage') {
        this.rightArrow = 2
      } else {
        this.rightArrow = 0
      }
    }
  },
  watch: {
    $route () {
      this.init()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.v-enter，
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}
main{
  margin-bottom: 50px;
  background: #F9F9F9;
  min-height: calc(100vh - 50px -46px);
  margin-top: 46px;
}
</style>

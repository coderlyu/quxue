<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  sockets: {
    connect: function () {
      // this.$toast('聊天功能已开启')
      console.log('聊天功能已开启')
    },
    receiveMessage: function (data) {
      // console.log(data)
      // console.log('不是测试，' + '收到：' + data.from + '给： ' + data.to + '的消息： ' + data.msg)
      this.$store.dispatch('chatmsg/setReceiveItem', { uId: data.from, type: 1, content: data.msg })
    },
    disconnect: function () {
      this.$toast('聊天功能已关闭')
    },
    tips: function (data) {
      this.$toast('对方不在线')
    }
  },
  // mounted () {
  // var timerOne = window.setInterval(() => {
  //   if (this.$socket) {
  //     this.$socket.emit('connect')
  //     window.clearInterval(timerOne)
  //   }
  // }, 5000)
  // },
  computed: {
    ...mapGetters('user', {
      'userId': 'id'
    }),
    ...mapGetters('chatmsg', {
      'isConnect': 'getIsConnect'
    })
  },
  methods: {
    _isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
    tipToMobile () {
      let w = window.screenWidth || document.body.clientWidth
      if (w > 800) {
        this.$toast('检测到你当前设备不是最佳浏览设备，换到移动端效果更佳哦')
      }
    }
  },
  watch: {
    userId () {
      if (this.userId) {
        // console.log(this.userId)
        // console.log(this.userId)
        if (!this.isConnect) {
          this.$socket.emit('getUserInfo', this.userId)
          this.$store.dispatch('chatmsg/changeConnect')
        }
      }
    }
  },
  created () {
    let isMobilePhone = this._isMobile()
    this.$store.dispatch('utils/changeIsMobilePhone', isMobilePhone)
    window.addEventListener('resize', this.tipToMobile)
    if (!this.isConnect && this.userId) {
      this.$socket.emit('getUserInfo', this.userId)
      this.$store.dispatch('chatmsg/changeConnect')
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.tipToMobile)
  }
}
</script>
<style lang="scss">
[v-cloak]{
  display: none;
}
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background: #f9f9f9;
}
</style>

<template>
  <div class="friends-intro">
    <div class="friends-intro-header">
      <van-nav-bar
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="ellipsis" slot="right" />
      </van-nav-bar>
    </div>
    <div class="friends-intro-body">
      <div class="intro-top">
        <div class="intro-top-img">
          <img :src="friend.avatar | filterAvatar" alt="头像">
        </div>
        <div class="intro-top-intro">
          <p>{{ friend.name }}
            <svg-icon v-if="friend.sex === 0" icon-class="woman2" style="font-size:16px;"/>
            <svg-icon v-else-if="friend.sex === 1" icon-class="man2" style="font-size:16px;"/>
            <svg-icon v-else icon-class="未知性别" style="font-size:16px;"/>
          </p>
          <p>昵称：{{ friend.name }}</p>
          <p>账号： {{ friend.user_number }}</p>
          <p>地区： {{ friend.address | filterAddress }}</p>
        </div>
      </div>
      <div class="intro-middle">
        <van-cell-group>
          <van-cell title="设置备注和标签" is-link/>
        </van-cell-group>
        <van-cell-group style="margin-top:5px;">
          <van-cell title="动态" is-link @click="toUserDetail"/>
          <van-cell title="更多信息" is-link />
        </van-cell-group>
      </div>
      <div class="intro-footer">
        <div class="intro-footer-item" @click="toSendMessage">
          <svg-icon icon-class="send-message" style="font-size:23px;"/>
          <p>发消息</p>
        </div>
        <div class="intro-footer-item" @click="toCallVideo">
          <svg-icon icon-class="video-call" style="font-size:23px;"/>
          <p>音视频通话</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  name: 'friendIntro',
  mixins: [myMixin],
  data () {
    return {
      id: this.$route.params.id,
      friend: {
        id: '',
        name: '',
        user_number: '',
        age: '',
        sex: '',
        avatar: '',
        intro: '',
        address: ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$toast('正在完善...')
    },
    toSendMessage () {
      this.$router.push({ name: 'chatView', params: { id: this.friend.id } })
      // this.$router.push({ name: 'chatView', params: { id: this.$route.params.id } })
    },
    toCallVideo () {
      this.$toast('正在完善视频通话...')
    },
    toUserDetail () {
      this.$router.push({ name: 'friendDetail', params: { id: this.$route.params.id } })
    },
    init () {
      this.$store.dispatch('user/getInfoById', this.$route.params.id).then(data => {
        this.friend = data
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.friends-intro{
  min-height: calc(100vh - 46px);
  margin-top: 46px;
  background: #f5f5f5;
  &-body{
    width: 100%;
    .intro-top{
      padding-bottom: 20px;
      width: 100%;
      background: white;
      display: flex;
      flex-direction: row;
      &-img{
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 50px;
          height: 50px;
          border-radius: 10px;
          box-shadow: 0 0 0 2px #f5f5f5;
        }
      }
      &-intro{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
      }
    }
    .intro-footer{
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      background: white;
      &-item{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        color: #003d61;
        border-bottom: 1px solid #f5f5f5;
        p{
          margin-left: 5px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="friend-detail">
    <div class="profile-top">
      <van-nav-bar
        title="好友详情"
        left-arrow
        fixed
        :z-index="10"
        @click-left="onClickBack"
      />
    </div>
    <div class="detail-bg">
    </div>
    <div class="friend-detail-body">
      <img class="body-img" :src="friend.avatar | filterAvatar" alt="头像" />
      <div class="body-top">
        <div class="follow-user" @click="getFollow">
          <van-icon name="plus" />
          <p>关注</p>
        </div>
        <div class="user-intro">
          <div class="user-intro-item">
            <p class="user-intro-item-number">0</p>
            <p class="user-intro-item-content">ta关注的</p>
          </div>
          <div class="user-intro-item">
            <p class="user-intro-item-number">12</p>
            <p class="user-intro-item-content">关注ta的</p>
          </div>
        </div>
        <div class="user-active">
          <van-tabs v-model="active">
            <van-tab>
              <template slot="title">
                <div class="user-active-nav">
                  <svg-icon icon-class="dongtai" style="font-size:20px;"/>
                  <p class="user-active-nav-p">动态</p>
                </div>
              </template>
                <my-active></my-active>
            </van-tab>
            <van-tab>
              <template slot="title">
                 <div class="user-active-nav">
                   <svg-icon icon-class="guanzhu" style="font-size:20px;"/>
                   <p class="user-active-nav-p">关注</p>
                </div>
              </template>
                <my-follow></my-follow>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
import myActive from '@/components/my-profile/my-active'
import myFollow from '@/components/my-profile/my-follow'
export default {
  name: 'myDetail',
  components: {
    myActive,
    myFollow
  },
  mixins: [myMixin],
  data () {
    return {
      active: 0,
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
    getFollow () {
      this.$toast('正在完善关注...')
    },
    onClickBack () {
      this.$router.go(-1)
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
.friend-detail{
  min-height: calc(100vh - 50px - 46px);
  position: relative;
  background: #f7f7f7;
  .detail-bg{
    position: absolute;
    top: 0;
    width: 100%;
    height: 150px;
    background: #2883d2;
    background: -moz-linear-gradient(top,  #2883d2 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#2883d2), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top,  #2883d2 0%,#ffffff 100%);
    background: -o-linear-gradient(top,  #2883d2 0%,#ffffff 100%);
    background: -ms-linear-gradient(top,  #2883d2 0%,#ffffff 100%);
    background: linear-gradient(to bottom,  #2883d2 0%,#ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff',GradientType=0 );
  }
  &-body{
    padding-bottom: 60px;
    display: flex;
    position: absolute;
    width: 100%;
    background: white;
    top: 100px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .body-img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      top: -50px;
      left: 20px;
      box-shadow: 0 0 0 3px white;
    }
    .body-top{
      width: 100%;
      padding-bottom: 10px;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      .follow-user{
        background: #3088d4;
        color: white;
        align-self: flex-end;
        font-size: 15px;
        font-weight: 600;
        width: 70px;
        height: 22px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 5px 0 0;
        cursor: pointer;
        p{
          margin-left: 3px;
        }
      }
      .user-intro{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        &-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 40%;
          cursor: pointer;
          &-number{
            color: #038aff;
            font-size: 18px;
            font-weight: 600;
          }
          &-content{
            font-size: 13px;
            font-weight: 200;
            color: #666;
            margin-top: 2px;
          }
        }
      }
      .user-active{
        margin-top: 20px;
        &-nav{
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          &-p{
            margin-left: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>

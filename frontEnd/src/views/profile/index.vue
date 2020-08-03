<template>
  <div class="profile-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row>
        <div class="profile-avatar">
          <div class="profile-avatar-left">
              <img :src="avatar" alt="头像" width="80" height="80" class="avatar">
          </div>
          <div class="profile-avatar-right">
            <div class="profile-avatar-right-content">
              <p class="title">{{ name }}
                <svg-icon icon-class="women" style="font-size:17px;color:white;" />
              </p>
              <p class="descript van-ellipsis">{{ intro }}</p>
            </div>
            <van-icon name="arrow" @click="toUserDetail" />
          </div>
        </div>
      </van-row>
      <van-row>
        <div class="click-item">
          <van-grid :gutter="10">
            <van-grid-item to="/friend/myfriends">
              <template slot="default">
                <div class="my-grid-item">
                  <svg-icon icon-class="all-friends" style="font-size:28px;"/>
                  <span>好友</span>
                </div>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template slot="default">
                <div class="my-grid-item">
                  <svg-icon icon-class="favorites" style="font-size:28px;"/>
                  <span>收藏夹</span>
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to="/user/myquestion">
              <template slot="default">
                <div class="my-grid-item">
                   <svg-icon icon-class="huifu2" style="font-size:28px;"/>
                  <span>说说</span>
                </div>
              </template>
            </van-grid-item>
            <van-grid-item to="/mybalance">
              <template slot="default">
                <div class="my-grid-item">
                  <svg-icon icon-class="balance" style="font-size:28px;"/>
                  <span>余额</span>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </van-row>
      <van-cell-group class="cell-group-style">
        <van-cell title="全部问题" is-link to="/user/myquestion">
          <template slot="icon">
            <svg-icon icon-class="all-question" style="font-size:18px;margin-top:3px;margin-right:5px;"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="cell-group-style">
        <van-cell icon="records" title="全部订单" is-link to="/user/myOrders">
          <template slot="icon">
            <svg-icon icon-class="all-goods" style="font-size:18px;margin-top:3px;margin-right:5px;"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="cell-group-style">
        <van-cell icon="points" title="我的积分" is-link >
          <template slot="icon">
            <svg-icon icon-class="jifeng" style="font-size:18px;margin-top:3px;margin-right:5px;"/>
          </template>
        </van-cell>
        <van-cell icon="gold-coin-o" title="我的优惠券" is-link >
          <template slot="icon">
            <svg-icon icon-class="coupon" style="font-size:18px;margin-top:3px;margin-right:5px;"/>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="cell-group-style">
        <van-cell icon="records" title="我的地址" is-link to="/user/addressList">
          <template slot="icon">
            <svg-icon icon-class="address" style="font-size:18px;margin-top:3px;margin-right:5px;"/>
          </template>
        </van-cell>
      </van-cell-group>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    toUserDetail () {
      this.$router.push('/user/detail')
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  },
  created () {
    // console.log(this.$store.getters.user)
  },
  computed: {
    avatar () {
      return this.$store.getters.avatar
    },
    name () {
      return this.$store.getters.name
    },
    intro () {
      return this.$store.getters.intro
    }
  }
}
</script>
<style lang="scss" scoped>
.cell-group-style{
  margin-top: 2px;
}
.profile-avatar{
  display: flex;
  height: 150px;
  background: #509A77;
  &-left{
    width: 100px;
    height: 150px;
    display: flex;
    justify-content: center;align-items: center;
    .avatar{
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
    }
  }
  &-right{
    color: white;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i{
      width: 30px;
    }
    &-content{
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .title{
        font-weight: 600;
        font-size: 17px;
        line-height: 25px;
      }
      .descript{
        font-size: 13px;
        line-height: 25px;
        color: #e0e0e0;
      }
    }
  }
}
.click-item{
  background: #F8F8F8;
  padding: 10px 0;
  .my-grid-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
      font-size: 14px;
      color: #444;
      margin-top: 5px;
    }
  }
}
</style>

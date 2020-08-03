<template>
  <div class="follow-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="empty" v-if="myFollowData.length === 0">
        <svg-icon icon-class="empty" style="font-size:64px;opacity: 0.5;"/>
        <p>还没有内容</p>
      </div>
      <div class="result" v-else>
        <template v-for="(item, index) in myFollowData">
          <my-follow-item :fItem="item" :key="index"></my-follow-item>
        </template>
        <div class="result-end">
          <p>没有更多了</p>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import myFollowItem from './my-follow-item'
export default {
  name: 'myfollow',
  components: {
    myFollowItem
  },
  data () {
    return {
      isLoading: false,
      myFollowData: []
    }
  },
  methods: {
    onRefresh () {
      this.$store.dispatch('user/getUserFriendsActives').then(res => {
        this.myFollowData = res.data
        this.$toast('刷新成功')
        this.isLoading = false
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    init () {
      this.$store.dispatch('user/getUserFriendsActives').then(res => {
        this.myFollowData = res.data
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
.follow-wrapper{
  padding: 0 10px;
  .empty{
    height: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p{
      font-size: 16px;
      font-weight: 200;
      color: #ccc;
    }
  }
  .result-end{
    margin-top: 30px;
    margin-bottom: 10px;
    color: #666;
    font-size: 14px;
    text-align: center;
  }
}
</style>

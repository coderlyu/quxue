<template>
  <div class="active-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="empty" v-if="myActiveData.length === 0">
        <svg-icon icon-class="empty" style="font-size:64px;opacity: 0.5;"/>
        <p>还没有内容</p>
      </div>
      <div class="result" v-else>
        <template v-for="(item, index) in myActiveData">
          <!-- <my-active-item :aItem="item" :key="index"></my-active-item> -->
          <friend-active-item :aItem="item" :key="index"></friend-active-item>
        </template>
        <div class="result-end">
          <p>没有更多了</p>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import friendActiveItem from './friend-active-item'
export default {
  name: 'myActive',
  components: {
    friendActiveItem
  },
  data () {
    return {
      isLoading: false,
      myActiveData: []
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    init () { // TODO
      this.$store.dispatch('user/getUserActives').then(res => {
        this.myActiveData = res.data
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
.active-wrapper{
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

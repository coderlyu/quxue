<template>
  <div class="search-user-item">
    <div class="search-user-img">
      <img :src="uItem.avatar | filterAvatar" alt="头像">
    </div>
    <div class="search-user-intro">
      <div class="search-user-intro-title">
        <p class="van-ellipsis">{{ uItem.name }}</p>
        <div v-if="!uItem.isFollow" class="search-user-intro-title-operation" @click="addFollow">
          <van-icon name="plus" />
          <span>关注</span>
        </div>
        <div v-else class="has_follow" @click="clearFollow">
          <span>取消关注</span>
        </div>
      </div>
      <p class="search-user-intro-content van-ellipsis">{{ uItem.intro }}</p>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  mixins: [myMixin],
  name: '',
  props: {
    uItem: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    addFollow () { // 关注
      let flolow = {
        u_id: this.uItem.id
      }
      this.$store.dispatch('user/toFollow', flolow).then(res => {
        if (res.count === 0) {
          this.$toast.fail(res.msg)
        } else {
          this.$toast('关注成功')
          this.$emit('toAddFollow', { item: res.data })
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    clearFollow () {
      let flolow = {
        u_id: this.uItem.id
      }
      this.$store.dispatch('user/clearFollow', flolow).then(res => {
        if (res.count === 0) {
          this.$toast.fail(res.msg)
        } else {
          this.$toast('取消关注成功')
          this.$emit('toClearFollow', { item: res.data })
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-user-item{
  background: white;
  margin-top: 10px;
  padding: 3px 5px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  .search-user-img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    img{
      width: 40px;
      height: 40px;
      border-radius: 10px;
      box-shadow: 0 0 0 2px #ccc;
    }
  }
  .search-user-intro{
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-title{
      display: flex;
      p{
        flex: 1;
        overflow: hidden;
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 2px;
      }
      &-operation{
        cursor: pointer;
        width: 45px;
        background: #0084FF;
        color: white;
        font-weight: 600;
        padding: 3px 5px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        border-radius: 10px;
        span{
          margin-left: 2px;
        }
      }
      .has_follow {
        cursor: pointer;
        width: 50px;
        background: white;
        color: #0084FF;
        font-weight: 600;
        padding: 3px 5px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        border-radius: 10px;
      }
    }
    &-content{
      font-size: 12px;
      margin-top: 2px;
      color: #666;
    }
  }
}
</style>

<template>
  <div class="my-friedns-item" @click="toDetail">
    <div class="content">
      <div class="content-img">
        <img :src="friend.avatar | filterAvatar" alt="头像">
      </div>
      <div class="content-p">
        <p class="van-ellipsis">{{ friend.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  name: 'myFriendsItem',
  mixins: [myMixin],
  props: {
    friend: {
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
    toDetail () {
      this.$router.push({ name: 'friendintro', params: { id: this.friend.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.my-friedns-item{
  height: 45px;
  background: white;
  padding: 5px 20px 3px 10px;
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
    padding-bottom: 10px;
    &-img{
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 35px;
        height: 35px;
        border-radius: 10px;
        box-shadow: 0 0 0 2px #efefef;
      }
    }
    &-p{
      flex: 1;
      overflow: hidden;
      display: flex;
      font-size: 16px;
      font-weight: 600;
      align-items: center;
      margin-left: 10px;
    }
  }
}
</style>

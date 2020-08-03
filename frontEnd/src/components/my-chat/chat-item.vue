<template>
  <van-swipe-cell :on-close="onClose">
    <template slot="default">
      <div class="chat-item-wrapper" @click="toChat">
        <div class="chat-item-left">
          <img :src="chatItem.avatar | filterAvatar" alt="头像">
        </div>
        <div class="chat-item-middle">
          <p class="chat-item-middle-name">{{ chatItem.name }}</p>
          <p class="chat-item-middle-content van-ellipsis">{{ chatItem.lastP }}</p>
        </div>
        <div class="chat-item-right">
          <p>{{ chatItem.time | filterTime }}</p>
        </div>
      </div>
    </template>
    <template slot="right">
      <van-button square type="danger" text="删除" style="height:50px" />
    </template>
  </van-swipe-cell>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  name: 'chatItem',
  mixins: [myMixin],
  props: {
    chatItem: {
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
    // clickPosition 表示关闭时点击的位置
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
          })
          break
      }
    },
    toChat () {
      this.$router.push({ name: 'chatView', params: { id: this.chatItem.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-item-wrapper{
  height: 50px;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #f7f7f7;
  background: white;
  .chat-item-left{
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
      border-radius: 10px;
      box-shadow: 0 0 0 2px #f5f5f5;
    }
  }
  .chat-item-middle{
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &-name{
      font-size: 15px;
      color: black;
      line-height: 25px;
      font-weight: 600;
    }
    &-content{
      font-size: 12px;
      color: #7d7d7d;
      line-height: 25px;
    }
  }
  .chat-item-right{
    width: 55px;
    display: flex;
    justify-content: flex-end;
    p{
      font-size: 10px;
      margin: 3px 5px 0 0 ;
      color: #d0d0d0;
    }
  }
}

</style>

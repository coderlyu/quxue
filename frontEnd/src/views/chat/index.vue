<template>
    <div class="chat-wrapper">
      <van-tabs>
        <van-tab >
          <template slot="title">
            <div class="title-content">
              <svg-icon icon-class="chating" style="font-size:20px;"/>
              <p>通话</p>
            </div>
          </template>
          <chat></chat>
        </van-tab>
        <van-tab>
          <template slot="title">
            <div class="title-content">
              <svg-icon icon-class="friends" style="font-size:20px;"/>
              <p>好友</p>
            </div>
          </template>
          <friends></friends>
        </van-tab>
      </van-tabs>
    </div>
</template>
<script>
import chat from '@/components/my-chat/chat.vue'
import friends from '@/components/my-chat/my-friends.vue'
export default {
  components: {
    chat,
    friends
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.chat-wrapper{
  .title-content{
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      margin-left: 5px;
    }
  }
}
</style>

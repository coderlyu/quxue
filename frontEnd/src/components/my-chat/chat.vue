<template>
  <div class="chat-wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="no-data" v-if="chatList.length === 0">
        <svg-icon icon-class="no-data"  style="font-size:150px;"/>
      </div>
      <div class="has-data" v-else>
        <template v-for="(item, index) in chatList">
          <chat-item :chatItem="item" :key="'chatItem' + index"></chat-item>
        </template>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
import { mapGetters } from 'vuex'
import chatItem from './chat-item.vue'
export default {
  mixins: [myMixin],
  components: {
    chatItem
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
    // init () {
    //   let chatList = this.chatListItem
    // }
  },
  computed: {
    ...mapGetters('chatmsg', {
      'getChatList': 'getChatList'
    }),
    chatList () {
      let arr = []
      this.getChatList.forEach(item => {
        let arrTmp = {
          id: item.user.id,
          name: item.user.name,
          avatar: item.user.avatar,
          lastP: item.data[item.data.length - 1].content,
          time: item.data[item.data.length - 1].time
        }
        arr.push(arrTmp)
      })
      return arr
    }
  },
  created () {
    // this.init()
    // console.log(this.getChatList)
  }
}
</script>
<style lang="scss" scoped>
.chat-wrapper{
  min-height: calc(100vh - 46px - 50px);
  .no-data{
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

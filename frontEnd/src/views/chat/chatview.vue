<template>
  <div class="chat">
    <div class="chat-header">
      <van-nav-bar fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="weapp-nav" slot="right" />
        <template slot="title">
          <div class="title-content">
            <span class="title-content-static">和</span>
            <p class="van-ellipsis">{{ friend.name }}</p>
            <span class="title-content-static">聊天</span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="chat-body">
      <div class="chat-info" @touchStart="touchStart" @touchEnd="touchEnd" v-for="(item, index) in chatData" :key="index">
        <div class="chat-info-left" v-if="item.type === 1">
          <div class="chat-info-left-img">
            <img :src="friend.avatar | filterAvatar" alt="头像">
          </div>
          <div class="chat-info-left-content">
            <div class="triangle"></div>
            <p v-html="item.content"></p>
          </div>
        </div>
        <div class="chat-info-right"  v-else-if="item.type === 2">
          <div class="chat-info-right-content mine">
          <!-- <div class="chat-info-right-content" :class="item.mine? 'mine':''"> -->
            <div class="triangle mine-border"></div>
            <!-- <div class="triangle" :class="item.mine? 'mine-border':''"></div> -->
            <p v-html="item.content"></p>
          </div>
          <div class="chat-info-right-img">
            <img :src="$store.getters.avatar | filterAvatar" alt="头像">
          </div>
        </div>
        <div class="chat-info-other" v-else>
          <p class="chat-info-other-notice">{{ item.content }}</p>
        </div>
      </div>
    </div>
    <div class="chat-bottom">
      <div class="chat-bottom-input">
        <input type="text" @focus="inputFocus" @blur="inputBlur" v-model="inputVal">
        <van-icon name="smile-o" class="addSmile" @click="showEmoji" />
        <button v-if="isShowBtn" :disabled="inputVal?false:true" @click="sendMsg">发送</button>
        <van-icon name="add-o" v-else class="btnadd" @click="moreFunction"/>
      </div>
      <div class="chat-bottom-function" v-if="isShowFunction">
        <van-grid :column-num="3">
          <van-grid-item icon="photo" text="图片" @click="addPhoto"/>
          <van-grid-item icon="volume" text="语音" @click="addVoice"/>
          <van-grid-item icon="video" text="拍照" @click="takePhoto"/>
        </van-grid>
      </div>
      <div class="chat-bottom-emoji" v-if="isShowEmoji">
        <van-swipe>
          <van-swipe-item v-for="(item, i) in emoji" :key="'item' + i">
            <div slot="default">
              <div class="emoji-wrapper">
                <template  v-for="(em, j) in item">
                  <div class="emoji-wrapper-item" :key="'item' + i + 'em' + j">
                    <template v-for="(e, t) in em">
                      <span :key="'item' + i + 'em' + j + 'e' + t" @click="addEmojiToInput($event, {i, j, t})">{{ e }}</span>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 隐藏input上传图片 -->
    <input type="file" ref="uploadImg" class="hidden" @change="changeImg">
    <van-action-sheet
      v-model="showMore"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="showMore=false"
    />
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
import emoji from '@/assets/data/emoji.js'
import { mapGetters } from 'vuex'
export default {
  name: 'chatView',
  mixins: [myMixin],
  data () {
    return {
      friend: {
        id: '',
        name: '',
        avatar: '',
        intro: ''
      },
      id: this.$route.params.id,
      isShowBtn: false,
      isShowFunction: false,
      isShowEmoji: false,
      isBackToChat: false,
      inputVal: '',
      emoji: emoji.data,
      showMore: false,
      actions: [
        { name: '撤回' },
        { name: '删除' },
        { name: '复制' }
      ],
      timeOutEvent: ''
    }
  },
  methods: {
    touchStart () {
      this.timeOutEvent = setTimeout(() => {
        this.showMore = true
      }, 500)
    },
    touchEnd () {
      clearTimeout(this.timeOutEvent)
    },
    scrolltoView () {
      let eleM = document.querySelector('.chat-body .chat-info:last-of-type')
      setTimeout(() => {
        eleM.scrollIntoView(true)
      }, 400)
    },
    onSelect (item, index) {
      switch (index) {
        case 0:
          console.log('撤回')
          break
        case 1:
          console.log('删除')
          break
        case 2:
          console.log('复制')
          break
        default:
          break
      }
    },
    inputBlur () {
      if (this.inputVal === '') {
        this.isShowBtn = false
      } else {
        this.isShowBtn = true
      }
      this.isShowFunction = false
      this.isShowEmoji = false
    },
    inputFocus () {
      this.isShowBtn = true
      this.isShowFunction = false
      this.isShowEmoji = false
    },
    moreFunction () {
      this.isShowFunction = true
      this.isShowEmoji = false
    },
    sendMsg () {
      this.$socket.emit('singleChatById', { from: this.$store.getters.id, to: this.friend.id, msg: this.inputVal })
      this.$store.dispatch('chatmsg/setChatListItem', { User: this.friend, content: this.inputVal, type: 2 })
      this.$nextTick(() => {
        this.scrolltoView()
      })
      this.inputVal = ''
    },
    addPhoto () {
      this.$refs.uploadImg.click()
    },
    changeImg (e) {
      let imgFile = e.target.files[0]
      let reader = new FileReader()
      reader.onload = e => {
        let img = `<img width="100" class="chatImg" src="${e.target.result}" alt="图片">`
        this.$store.dispatch('chatmsg/setChatListItem', { User: this.friend, content: img, type: 2 })
        this.$nextTick(() => {
          this.scrolltoView()
        })
      }
      reader.readAsDataURL(imgFile)
    },
    addVoice () {
      console.log('添加语音')
    },
    takePhoto () {
      console.log('拍照上传')
    },
    onClickLeft () {
      if (this.isBackToChat === false) {
        this.$router.go(-1)
      } else {
        this.$router.push('/chat')
      }
    },
    onClickRight () {
      this.$router.push({ name: 'friendintro', params: { id: this.id } })
    },
    addEmojiToInput (event, { i, j, t }) {
      this.inputVal = this.inputVal + this.emoji[i][j][t]
    },
    showEmoji () {
      this.isShowEmoji = true
      this.isShowFunction = false
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
    // this.$store.dispatch('chatmsg/setChatListItem', { User: this.User, content: 'ni好啊', type: 1})
  },
  watch: {
    inputVal () {
      if (this.inputVal !== '') {
        this.isShowBtn = true
      } else {
        this.isShowBtn = false
      }
    }
  },
  computed: {
    ...mapGetters('chatmsg', {
      'chatList': 'getChatList'
    }),
    chatData () {
      let item = []
      this.chatList.some(ele => {
        if (ele.user.id === this.friend.id) {
          item = ele.data
          return true
        }
      })
      return item
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'friendIntro') {
        vm.isBackToChat = true
      }
      // 通过 `vm` 访问组件实例
    })
  },
  beforeDestroy () {
    clearTimeout(this.timeOutEvent)
  }
}
</script>
<style lang="scss" scoped>
.chatImg {
  width: 100px;
}
.hidden {
  visibility: hidden;
}
/deep/ .van-swipe__indicator{
  background-color: #0081c5;
}
.chat{
  &-header{
    .title-content{
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        font-size: 16px;
        font-weight: 600;
      }
      &-static{
        width: 40px;
      }
    }
  }
  min-height: calc(100vh - 46px - 35px);
  padding-top: 46px;
  background: #f7f7f7;
  &-body{
    padding-bottom: 110px;
    .chat-info {
      display: flex;
      flex-direction: column;
      &-left {
        margin: 5px 50px 5px 0;
        display: flex;
        &-img{
          width: 50px;
          display: flex;
          justify-content: center;
          img{
            width:40px;
            height: 40px;
            border-radius: 10px;
          }
        }
        &-content {
          margin-left: 4px;
          flex: 1;
          font-size: 14px;
          background: white;
          color: #3a3a3a;
          border-radius: 5px;
          padding:  10px 5px;
          position: relative;
          div.triangle {
            position: absolute;
            width: 0;
            height: 0;
            border: 7px solid;
            border-color: transparent white transparent transparent;
            left: -13px;
            top: 13px;
          }
        }
      }
      &-right {
        margin: 5px 0 5px 50px;
        display: flex;
        &-content {
          margin-right: 4px;
          flex: 1;
          font-size: 14px;
          background: white;
          color: #3a3a3a;
          border-radius: 5px;
          padding:  10px 5px;
          position: relative;
          div.triangle {
            position: absolute;
            width: 0;
            height: 0;
            border: 7px solid;
            border-color: transparent transparent transparent white;
            right: -13px;
            top: 13px;
          }
        }
        &-img{
          width: 50px;
          display: flex;
          justify-content: center;
          img{
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
        }
      }
      &-other{
        margin: 5px 0;
        display: flex;
        justify-content: center;
        &-notice{
          font-size: 12px;
          color: #737373;
          font-weight: 200;
        }
      }
    }
  }
  &-bottom{
    position: fixed;
    bottom: 0;
    border-top: 1px solid #e8e8e8;
    padding: 2px 3px 2px 5px;
    background: #f7f7f7;
    left: 0;
    right: 0;
    &-input{
      height: 50px;
      display: flex;
      flex-direction: row;
      input{
        flex: 1;
        display: block;
        border:none;
        background: white;
      }
      .addSmile{
        width: 50px;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }
      button{
        display: inline-block;
        width: 50px;
        background: #EE0A24;
        color: white;
        border: none;
        font-size: 13px;
      }
      button[disabled] {
       opacity: 0.5;
      }
      .btnadd{
        width: 45px;
        font-size: 25px;
        display: flex;
        font-weight: 600;
        justify-content: center;
        align-items: center;
      }
    }
    &-function {
      background: #f7f7f7;
      // height: 90px;
      padding: 9px 0;
    }
    &-emoji {
      border-top: 1px solid #f3f3f3;
      box-sizing: border-box;
      width: 100%;
      .emoji-wrapper{
        background: white;
        height: 101px;
        display: flex;
        flex-direction: column;
        &-item{
          display: flex;
          justify-content: space-between;
          margin: 5px 20px 1px 20px;
          // margin: 5px 50px 1px 50px;
          // span{
            // margin-right: 20px;
          // }
        }
      }
    }
  }
}
.mine{
  background: #63b6fd !important;
  color:white !important;
}
.mine-border{
  border-color: transparent transparent transparent #63b6fd !important;
}
</style>

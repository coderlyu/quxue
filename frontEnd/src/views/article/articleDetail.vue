<template>
  <div class="article-detail">
    <van-nav-bar
      title="详情"
      fixed
      left-arrow
      @click-left="onBack"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="article-detail-top">
        <div class="top-left" @click="toPeosonDetail">
          <van-image
            round
            width="55px"
            height="55px"
            :src="detailDate[0].avatar"
          />
        </div>
        <div class="top-center">
          <p class="top-center-title van-ellipsis">{{ detailDate[0].name }}</p>
          <p class="top-center-desc van-ellipsis">{{ detailDate[0].intro ? detailDate[0].intro : '这个家伙很懒，什么都没有留下,什么都没有留下' }}</p>
        </div>
        <div class="top-right">
          <span class="hasFollow" v-if="detailDate[0].isFollow" @click="clearFollow">已关注</span>
          <van-tag v-else plain color="#0084FF" @click="follow"><van-icon name="plus" />关注</van-tag>
        </div>
      </div>
      <div class="article-detail-middle">
        <rich-content :content="detailDate[1].content"></rich-content>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> end </van-divider>
      </div>
      <div class="add-commonts">
        <van-cell-group>
          <van-field
            v-model="message"
            rows="1"
            autosize
            label="评论"
            type="textarea"
            maxlength="50"
            placeholder="请输入评论"
            show-word-limit
          />
        </van-cell-group>
        <van-button plain type="primary" @click="submitComment" size="small">确认评论</van-button>
      </div>
      <div class="article-detail-bottom">
        <h3>用户评论</h3>
        <div v-if="comments.length > 0">
          <template v-for="(commentItem, index) in comments">
            <my-comments :commentItem="commentItem" :key="index" @updateComments="updateComments"></my-comments>
          </template>
          <div class="add-more">
          <van-button size="small" :disabled="showBtn" @click="addMoreComments" :loading="loading" color="linear-gradient(to right, #4bb0ff, #6149f6)">加载更多</van-button>
          </div>
        </div>
        <div class="no-data" v-else>
          <p>暂无评论</p>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getCommentsById } from '@/api/question'
import richContent from '@/components/rich-content'
import myComments from '@/components/my-comments'
export default {
  name: 'articleDetail',
  components: {
    richContent,
    myComments
  },
  data () {
    return {
      commentPage: 1,
      commentPageSize: 5,
      showBtn: false,
      message: '',
      isLoading: false,
      id: this.$route.params.id,
      loading: false,
      detailDate: [
        { avatar: '', name: '', intro: '', isFollow: false, id: '' },
        { content: '' }
      ],
      comments: []
    }
  },
  methods: {
    submitComment () {
      if (!this.message) {
        this.$toast('评论内容不能为空')
        return
      }
      let comment = {
        q_id: this.id,
        u_id: this.$store.getters.id,
        content: this.message
      }
      this.$store.dispatch('question/submitComment', comment).then(data => {
        this.$toast.success('评论成功')
        this.message = ''
        this.getCommentList()
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    updateComments (comment) {
      let index = -1
      this.comments.forEach((item, i) => {
        if (item.id === comment.id) {
          index = i
        }
      })
      if (index > -1) {
        this.comments.splice(index, 1, comment)
      }
    },
    addMoreComments () {
      this.commentPage += 1
      this.concatCommentList()
    },
    onBack () {
      this.$router.go(-1)
    },
    follow () {
      if (this.detailDate[0].id === this.$store.getters.id) {
        this.$toast('无法关注自己')
        return
      }
      let flolow = {
        u_id: this.detailDate[0].id
      }
      this.$store.dispatch('user/toFollow', flolow).then(res => {
        if (res.count === 0) {
          this.$toast.fail(res.msg)
        } else {
          this.$toast('关注成功')
          this.detailDate[0].isFollow = true
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    clearFollow () {
      let flolow = {
        u_id: this.detailDate[0].id
      }
      this.$store.dispatch('user/clearFollow', flolow).then(res => {
        if (res.count === 0) {
          this.$toast.fail(res.msg)
        } else {
          this.$toast('取消关注成功')
          this.detailDate[0].isFollow = false
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    toPeosonDetail () {
      this.$toast('个人详情正在完善...')
    },
    onRefresh () {
      this.message = ''
      this.detailDate = [
        { avatar: '', name: '', intro: '' },
        { content: '' }
      ]
      this.$store.dispatch('question/getDetail', this.$route.params.id).then(data => {
        this.detailDate = data
        this.$toast('刷新成功')
        this.isLoading = false
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    init () {
      this.$store.dispatch('question/getDetail', this.$route.params.id).then(data => {
        this.detailDate = data
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    concatCommentList () {
      let commentsData = {
        page: this.commentPage,
        number: this.commentPageSize,
        q_id: this.$route.params.id
      }
      getCommentsById(commentsData).then(res => {
        if (res.code === 1) {
          this.comments = this.comments.concat(res.data)
          if (this.commentPage * this.commentPageSize >= res.total) {
            this.showBtn = true
          } else {
            this.showBtn = false
          }
        } else {
          this.$toast.fail('获取评论失败')
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    getCommentList () {
      let commentsData = {
        page: this.commentPage,
        number: this.commentPageSize,
        q_id: this.$route.params.id
      }
      getCommentsById(commentsData).then(res => {
        if (res.code === 1) {
          this.comments = res.data
          if (this.commentPage * this.commentPageSize >= res.total) {
            this.showBtn = true
          } else {
            this.showBtn = false
          }
        } else {
          this.$toast.fail('获取评论失败')
        }
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  },
  created () {
    this.init()
    this.getCommentList()
  }
}
</script>
<style lang="scss" scoped>
.article-detail{
  min-height: 100vh;
  background: white;
  &-top{
    border-bottom: 1px solid #efefef;
    margin-top: 46px;
    display: flex;
    height: 70px;
    .top-left{
      margin-right: 5px;
      width: 65px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .top-center{
      padding: 10px 0;
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-title{
        font-size: 20px;
        line-height: 25px;
        font-weight: 600;
      }
      &-desc{
        font-size: 12px;
        font-weight: 200;
        color: #333;
      }
    }
    .top-right{
      width: 60px;
      .hasFollow{
        cursor: pointer;
        color: rgb(0, 132, 255);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      span{
        font-size: 13px;
        height: 25px;
        margin-top: 10px;
        i{
          margin-right: 5px;
        }
      }
    }
  }
  &-middle{
    margin-top: 20px;
    // 富文本内容
    .RichContent-inner{
      margin-top: 9px;
      margin-bottom: -4px;
      overflow: hidden;
      h1{
        font-size: 18px;
      }
    }
  }
  .add-commonts {
    text-align: center;
    padding: 10px 0;
    button {
      cursor: pointer;
    }
  }
  &-bottom{
    padding: 0 5px;
    .add-more{
      margin: 10px 0;
      display: flex;
      justify-content: center;
    }
    .no-data {
      margin: 10px 0;
      p{
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #666;
      }
    }
  }
}
</style>

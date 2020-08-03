<template>
  <div class="comments">
    <div class="comments-top">
      <div class="comments-top-img">
        <img :src="commentItem.user_avatar" alt="头像">
      </div>
      <div class="comments-top-title">
        <p class="comments-top-title-nick van-ellipsis">{{ commentItem.user_name }}</p>
        <p class="comments-top-title-time van-ellipsis">{{ commentItem.create_time | formatDate }}</p>
      </div>
    </div>
    <div class="comments-content">
      <p class="comments-content-body">{{ commentItem.content }}</p>
    </div>
    <div class="comments-footer">
      <div class="comments-footer-dianzan">
        <van-icon name="good-job-o" class="i-icon" @click="toSupport" style="cursor: pointer;" />
        <p>{{ commentItem.support }}</p>
      </div>
      <van-icon name="comment-o" class="i-icon" style="cursor: pointer;" />
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  mixins: [myMixin],
  props: {
    commentItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    toSupport () {
      let comment = {
        c_id: this.commentItem.id
      }
      this.$store.dispatch('user/updateSupport', comment).then(res => {
        this.$toast('点赞成功')
        this.$emit('updateComments', res.data)
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.comments{
  margin-top: 10px;
  border-top: 1px solid #efefef;
  padding:5px;
  display: flex;
  flex-direction: column;
  &-top{
    display: flex;
    flex-direction: row;
    &-img{
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 40px;
        height: 40px;
        border-radius: 5px;
        box-shadow: 0 0 0 2px #ccc;
      }
    }
    &-title{
      flex: 1;
      overflow: hidden;
      padding: 2px 0;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      &-nick{
        font-size: 16px;
        font-weight: 600;
      }
      &-time{
        font-size: 12px;
        color: #666;
      }
    }
  }
  &-content{
    margin-top: 5px;
    font-size: 14px;
    color: #555;
    text-indent: 2em;
  }
  &-footer{
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    color: #666;
    padding-right: 20px;
    &-dianzan{
      display: flex;
      align-items: flex-end;
      margin-right: 20px;
      p{
        font-size: 14px;
      }
    }
  }
}
</style>

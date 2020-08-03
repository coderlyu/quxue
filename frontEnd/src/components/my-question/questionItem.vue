<template>
  <div class="questionItem-wrapper van-hairline--top-bottom">
    <div class="head" @click="jumpToDetail">
      <div class="head-top">
        <p class="head-top-title van-ellipsis">{{ item.title }}</p>
      </div>
      <div class="head-bottom">
        <div class="head-bottom-img">
          <img :src="item.imgUrl" alt="">
        </div>
        <p class="head-bottom-content van-multi-ellipsis--l3"> {{ item.info }}</p>
      </div>
    </div>
    <div class="footer">
      <div class="other-state">
        <van-icon name="clock-o" class="i-icon"/>
        <p>{{ item.create_time | formatDate }}</p>
      </div>
      <div class="footer-right">
        <div class="other-state">
          <van-icon name="good-job-o" @click="updateQSupport" class="i-icon" />
          <p>{{ item.support }}</p>
        </div>
        <div class="other-state" style="margin-left:10px;">
          <van-icon name="star-o" class="i-icon" />
          <p>{{ item.collection_num }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from '@/utils/myMixin'
export default {
  props: ['item'],
  mixins: [mixin],
  data () {
    return {
    }
  },
  methods: {
    updateQSupport () {
      let question = {
        q_id: this.item.id
      }
      this.$store.dispatch('question/updateQSupport', question).then(res => {
        this.$emit('updateItem', res.data)
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    },
    jumpToDetail () {
      this.$router.push({ name: 'articleDetail', params: { id: this.item.id } })
      // console.log(this.item.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.questionItem-wrapper{
  background: white;
  border-radius: 10px;
  padding: 10px 10px 5px 10px;
  margin-top: 10px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .head{
    display: flex;
    flex-direction: column;
    &-top{
      height: 25px;
      line-height: 25px;
      &-title{
        font-size: 17px;
        font-weight: 600;
      }
    }
    &-bottom{
      margin: 5px;
      display: flex;
      &-img{
        width: 90px;
        height: 60px;
        img{
          width: 90px;
          height: 60px;
        }
      }
      &-content{
        flex: 1;
        overflow: hidden;
        font-size: 13px;
        margin: 5px;
        text-indent: 2em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
      }
    }
  }
  .footer{
    height: 20px;
    color: #8590a6;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    .other-state{
      display: flex;
      .i-icon{
        font-size: 16px;
      }
      p{
        align-self: flex-end;
        margin-left: 3px;
        line-height: 13px;
      }
    }
    &-right{
      display: flex;
    }
  }
}
</style>

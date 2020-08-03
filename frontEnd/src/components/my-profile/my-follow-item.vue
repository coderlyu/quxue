<template>
  <div class="my-follow-item">
    <div class="item-title">
      <div class="item-title-img">
        <img :src="fItem.avatar" alt="头像">
      </div>
      <div class="item-title-intro">
        <p class="item-title-intro-title van-ellipsis">{{ fItem.title }}</p>
        <p class="item-title-intro-time van-ellipsis">{{ fItem.create_time | formatDate }}</p>
      </div>
    </div>
    <div class="item-body">
      <div class="item-body-content">
        <p class="item-body-content-p van-multi-ellipsis--l3">{{ fItem.info }}</p>
      </div>
      <div class="item-body-other">
        <div class="icon-item">
          <van-icon name="good-job-o" class="i-icon" />
          <span>{{ fItem.support }}</span>
        </div>
        <div class="icon-item">
          <van-icon name="comment-o" class="i-icon" />
        </div>
       </div>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  name: 'myFollowItem',
  mixins: [myMixin],
  props: {
    fItem: {
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
  }
}
</script>
<style lang="scss" scoped>
.my-follow-item{
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  border-bottom: 1px solid #efefef;
  padding-top: 5px;
  padding-bottom: 5px;
  .item-title{
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
        border-radius: 10px;
      }
    }
    &-intro{
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 0;
      &-title{
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
      }
      &-time{
        font-size: 12px;
        color: #666;
        font-weight: 200;
      }
    }

  }
  .item-body{
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    &-content{
      width: 100%;
      font-size: 14px;
      color: #444;
      line-height: 22px;
      text-indent: 2em;
    }
    &-other{
      margin-top: 5px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .icon-item{
        cursor: pointer;
        flex: 1;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        line-height: 18px;
        span {
          color: #444;
          margin-left: 5px;
        }
      }
      .i-icon{
        font-size: 20px;
      }
    }
  }
}
</style>

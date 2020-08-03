<template>
  <div class="myquestion-item">
    <div class="item-left">
      <div class="item-left-title">
        <p class="van-ellipsis">{{ qItem.title }}</p>
      </div>
      <div class="item-left-body">
        <p class="item-left-body-content van-multi-ellipsis--l2">{{ qItem.info }}</p>
        <p class="item-left-body-time van-ellipsis">
          <van-icon name="clock-o" style="position: absolute;top: 50%;transform: translate(0, -50%);left: 5px;" />
          <span>{{ qItem.create_time | formatDate }}</span>
        </p>
      </div>
    </div>
    <div class="item-right">
       <van-button type="info" size="mini" @click="toEdit">编辑</van-button>
      <van-button type="info" size="mini" @click="toDetail" v-if="qType === 0">查看</van-button>
      <van-button type="warning" size="mini" @click="toDelete">删除</van-button>
    </div>
  </div>
</template>
<script>
import myMixin from '@/utils/myMixin'
export default {
  mixins: [myMixin],
  props: {
    qType: {
      type: Number,
      default: 0,
      required: true
    },
    qItem: {
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
    toEdit () {
      this.$router.push({ name: 'editArticle', params: { id: this.qItem.id } })
    },
    toDetail () {
      this.$router.push({ name: 'articleDetail', params: { id: this.qItem.id } })
    },
    toDelete () {
      this.$store.dispatch('question/toDeleteQuestion', this.qItem.id).then(res => {
        this.$emit('toDelete', { item: this.qItem, type: this.qType })
        this.$toast('删除成功')
      }).catch(err => {
        this.$toast.fail(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.myquestion-item {
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  height: 90px;
  background: #fff;
  // background: #f9f9f9;
  // border-bottom: 1px dotted #666;
  .item-left {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &-title {
      margin: 5px 5px 5px 0;
      color: #000;
      font-weight: 700;
      font-size: 15px;
    }
    &-body {
      display: flex;
      flex-direction: column;
      &-content {
        font-size: 13px;
        color: #333;
        text-indent: 2em;
        line-height: 17px;
      }
      &-time {
        position: relative;
        margin-top: 5px;
        font-size: 12px;
        color: #666;
        span{
          margin-left: 20px;
        }
      }
    }
  }
  .item-right {
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    button{
      margin: 5px 0;
    }
  }
}
</style>

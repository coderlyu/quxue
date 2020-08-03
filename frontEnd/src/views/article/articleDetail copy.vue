<template>
  <div class="article-detail">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="article-detail-top">
        <div class="top-left" @click="toPeosonDetail">
          <van-image
            round
            width="55px"
            height="55px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="top-center">
          <p class="top-center-title van-ellipsis">coderly</p>
          <p class="top-center-desc van-ellipsis">这个家伙很懒，什么都没有留下,什么都没有留下</p>
        </div>
        <div class="top-right">
          <van-tag plain color="#0084FF" @click="follow"><van-icon name="plus" />关注</van-tag>
        </div>
      </div>
      <div class="article-detail-middle">
        <rich-content></rich-content>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> end </van-divider>
      </div>
      <div class="article-detail-bottom">
        <h2>评论</h2>
        <template v-for="(item, index) in 4">
          <my-comments :item="item" :key="index"></my-comments>
        </template>
        <div class="add-more">
        <van-button size="small" :loading="loading" color="linear-gradient(to right, #4bb0ff, #6149f6)">加载更多</van-button>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import richContent from '@/components/rich-content'
import myComments from '@/components/my-comments'
export default {
  components: {
    richContent,
    myComments
  },
  data () {
    return {
      isLoading: false,
      id: this.$route.params.id,
      loading: false
    }
  },
  methods: {
    follow () {
      this.$toast('关注正在完善...')
    },
    toPeosonDetail () {
       this.$toast('个人详情正在完善...')
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.article-detail{
  background: white;
  padding-bottom: 30px;
  &-top{
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
        font-size: 13px;
        font-weight: 200;
        color: #5d5d5d;
      }
    }
    .top-right{
      width: 60px;
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
  &-bottom{
    padding: 0 5px;
    .add-more{
      margin: 10px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
